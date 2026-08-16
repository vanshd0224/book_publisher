import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import { CartService } from '../cart/cart.service';
import { StorageService } from '../storage/storage.service';
import { CreateIndividualOrderDto, CreateInstitutionalOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { OrderStatus, OrderType, PaymentMethod } from '@prisma/client';
import Razorpay from 'razorpay';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  private razorpay: Razorpay;

  constructor(
    private prisma: PrismaService,
    private cartService: CartService,
    private storageService: StorageService,
    private configService: ConfigService,
  ) {
    const keyId = this.configService.get<string>('RAZORPAY_KEY_ID') || 'rzp_test_dummy';
    const keySecret = this.configService.get<string>('RAZORPAY_KEY_SECRET') || 'dummy_secret';
    this.razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  async createIndividualOrder(userId: string, dto: CreateIndividualOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    // Calculate totals using DB products
    let subtotal = 0;
    let totalQuantity = 0;
    let totalGst = 0;
    const itemDetails: { productId: string; quantity: number; unitPrice: number }[] = [];

    for (const item of dto.items) {
      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for product ${product.title}`);
      }

      const itemSubtotal = product.price * item.quantity;
      const itemGst = itemSubtotal * (product.gstRate / 100);

      subtotal += itemSubtotal;
      totalQuantity += item.quantity;
      totalGst += itemGst;

      itemDetails.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price,
      });
    }

    const discountPercent = await this.cartService.calculateBulkDiscountPercent(totalQuantity);
    const discountApplied = subtotal * (discountPercent / 100);
    const total = subtotal - discountApplied + totalGst;

    // Execute in Database Transaction
    const order = await this.prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          orderType: OrderType.INDIVIDUAL,
          status: OrderStatus.PENDING_PAYMENT,
          paymentMethod: dto.paymentMethod || PaymentMethod.RAZORPAY,
          subtotal,
          discountApplied,
          gstAmount: totalGst,
          total,
          shippingAddress: dto.shippingAddress,
          items: {
            create: itemDetails.map((i) => ({
              productId: i.productId,
              quantity: i.quantity,
              unitPrice: i.unitPrice,
            })),
          },
        },
        include: { items: true },
      });

      // Clear user cart
      await tx.cartItem.deleteMany({ where: { userId } });

      return newOrder;
    });

    // Create Razorpay Order
    let razorpayOrderId = `order_mock_${Date.now()}`;
    try {
      if (this.configService.get('RAZORPAY_KEY_ID') && !this.configService.get('RAZORPAY_KEY_ID').includes('test_xxxxxx')) {
        const rzpOrder = await this.razorpay.orders.create({
          amount: Math.round(total * 100), // In paise
          currency: 'INR',
          receipt: order.id,
        });
        razorpayOrderId = rzpOrder.id;
      }
    } catch (e) {
      this.logger.warn(`Razorpay API order creation fallback: ${e.message}`);
    }

    // Save Payment record shell
    await this.prisma.payment.create({
      data: {
        orderId: order.id,
        gatewayOrderId: razorpayOrderId,
        amount: total,
        status: 'created',
      },
    });

    return {
      order,
      razorpayOrderId,
      keyId: this.configService.get('RAZORPAY_KEY_ID') || 'rzp_test_dummy',
    };
  }

  async createInstitutionalOrder(userId: string, dto: CreateInstitutionalOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Order must contain at least one item');
    }

    let subtotal = 0;
    let totalQuantity = 0;
    let totalGst = 0;
    const itemDetails: { productId: string; quantity: number; unitPrice: number }[] = [];

    for (const item of dto.items) {
      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }
      const itemSubtotal = product.price * item.quantity;
      const itemGst = itemSubtotal * (product.gstRate / 100);

      subtotal += itemSubtotal;
      totalQuantity += item.quantity;
      totalGst += itemGst;

      itemDetails.push({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: product.price,
      });
    }

    const discountPercent = await this.cartService.calculateBulkDiscountPercent(totalQuantity);
    const discountApplied = subtotal * (discountPercent / 100);
    const total = subtotal - discountApplied + totalGst;

    const order = await this.prisma.order.create({
      data: {
        userId,
        orderType: OrderType.INSTITUTIONAL,
        status: OrderStatus.PENDING_APPROVAL,
        paymentMethod: dto.paymentMethod || PaymentMethod.PO,
        subtotal,
        discountApplied,
        gstAmount: totalGst,
        tdsExpected: dto.tdsExpected || 0.0,
        total,
        shippingAddress: dto.shippingAddress,
        items: {
          create: itemDetails.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
 unitPrice: i.unitPrice,
          })),
        },
      },
      include: { items: true, user: { include: { institutionProfile: true } } },
    });

    return {
      order,
      message: 'Institutional order created successfully in PENDING_APPROVAL status. Please upload Purchase Order (PO).',
    };
  }

  async getOrderById(orderId: string, userId?: string) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, deletedAt: null },
      include: {
        items: { include: { product: true } },
        invoices: true,
        poUploads: true,
        payments: true,
        user: { include: { institutionProfile: true } },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    return order;
  }

  async getUserOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId, deletedAt: null },
      include: {
        items: { include: { product: true } },
        invoices: true,
        poUploads: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateOrderStatus(orderId: string, dto: UpdateOrderStatusDto) {
    const order = await this.getOrderById(orderId);
    return this.prisma.order.update({
      where: { id: order.id },
      data: { status: dto.status },
    });
  }

  async uploadPO(orderId: string, file: Express.Multer.File) {
    const order = await this.getOrderById(orderId);
    const filename = `PO_${orderId}_${Date.now()}_${file.originalname}`;
    const fileUrl = await this.storageService.uploadFile(file.buffer, filename, 'po_documents');

    const poUpload = await this.prisma.pOUpload.create({
      data: {
        orderId: order.id,
        fileUrl,
        status: 'PENDING_REVIEW',
      },
    });

    return {
      poUpload,
      message: 'PO uploaded successfully and sent for admin review.',
    };
  }
}
