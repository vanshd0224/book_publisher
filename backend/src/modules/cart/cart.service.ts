import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId?: string, sessionId?: string) {
    if (!userId && !sessionId) {
      return {
        items: [],
        subtotal: 0,
        totalQuantity: 0,
        applicableDiscountPercent: 0,
        discountAmount: 0,
        gstAmount: 0,
        total: 0,
      };
    }

    const where: any = {};
    if (userId) {
      where.userId = userId;
    } else {
      where.sessionId = sessionId;
    }

    const cartItems = await this.prisma.cartItem.findMany({
      where,
      include: { product: true },
    });

    let subtotal = 0;
    let totalQuantity = 0;
    let totalGst = 0;

    const formattedItems = cartItems.map((item) => {
      const itemSubtotal = item.product.price * item.quantity;
      const itemGst = itemSubtotal * (item.product.gstRate / 100);
      subtotal += itemSubtotal;
      totalQuantity += item.quantity;
      totalGst += itemGst;

      return {
        id: item.id,
        productId: item.productId,
        productTitle: item.product.title,
        unitPrice: item.product.price,
        quantity: item.quantity,
        hsnCode: item.product.hsnCode,
        itemSubtotal,
      };
    });

    // Dynamic Backend Tiered Bulk Discount Calculation
    const discountPercent = await this.calculateBulkDiscountPercent(totalQuantity);
    const discountAmount = subtotal * (discountPercent / 100);
    const total = subtotal - discountAmount + totalGst;

    return {
      items: formattedItems,
      totalQuantity,
      subtotal,
      applicableDiscountPercent: discountPercent,
      discountAmount,
      gstAmount: totalGst,
      total,
    };
  }

  /**
   * Reads dynamic configurable discount tiers from database (DiscountTier table)
   */
  async calculateBulkDiscountPercent(totalQuantity: number): Promise<number> {
    if (totalQuantity <= 0) return 0;

    const tiers = await this.prisma.discountTier.findMany({
      orderBy: { minQuantity: 'asc' },
    });

    if (!tiers || tiers.length === 0) {
      // Hardcoded fallback safety standard
      if (totalQuantity >= 20) return 20;
      if (totalQuantity >= 5) return 10;
      return 0;
    }

    let appliedDiscount = 0;
    for (const tier of tiers) {
      if (totalQuantity >= tier.minQuantity) {
        if (tier.maxQuantity === null || totalQuantity <= tier.maxQuantity) {
          appliedDiscount = tier.discountPercent;
          break;
        }
      }
    }

    return appliedDiscount;
  }

  async addToCart(dto: AddToCartDto, userId?: string) {
    const product = await this.prisma.product.findUnique({ where: { id: dto.productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const where: any = { productId: dto.productId };
    if (userId) {
      where.userId = userId;
    } else if (dto.sessionId) {
      where.sessionId = dto.sessionId;
    }

    const existingItem = await this.prisma.cartItem.findFirst({ where });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + dto.quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          productId: dto.productId,
          quantity: dto.quantity,
          userId: userId || null,
          sessionId: dto.sessionId || null,
        },
      });
    }

    return this.getCart(userId, dto.sessionId);
  }

  async updateCartItem(itemId: string, dto: UpdateCartItemDto, userId?: string) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity: dto.quantity },
    });

    return this.getCart(userId, item.sessionId);
  }

  async removeCartItem(itemId: string, userId?: string) {
    const item = await this.prisma.cartItem.findUnique({ where: { id: itemId } });
    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    await this.prisma.cartItem.delete({ where: { id: itemId } });
    return this.getCart(userId, item.sessionId);
  }
}
