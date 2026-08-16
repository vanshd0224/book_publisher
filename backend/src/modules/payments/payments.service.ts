import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import { InvoicesService } from '../invoices/invoices.service';
import { SmsService } from '../notifications/sms.service';
import { OrderStatus } from '@prisma/client';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private invoicesService: InvoicesService,
    private smsService: SmsService,
  ) {}

  async handleWebhook(rawBody: string | Buffer, signature: string, payload: any) {
    const webhookSecret = this.configService.get<string>('RAZORPAY_WEBHOOK_SECRET') || 'whsec_xxxxxx';

    // 1. Verify Razorpay Webhook Signature
    if (signature && !webhookSecret.includes('xxxxxx')) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(rawBody.toString())
        .digest('hex');

      if (expectedSignature !== signature) {
        this.logger.error('Invalid Razorpay Webhook signature detected');
        throw new BadRequestException('Invalid webhook signature');
      }
    }

    const event = payload.event;
    this.logger.log(`Received payment webhook event: ${event}`);

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = payload.payload?.payment?.entity || payload.payload?.order?.entity;
      const gatewayPaymentId = paymentEntity?.id || `pay_${Date.now()}`;
      const gatewayOrderId = paymentEntity?.order_id;
      const amount = (paymentEntity?.amount || 0) / 100;
      const orderId = paymentEntity?.notes?.order_id || paymentEntity?.receipt;

      // 2. Idempotency handling: check if payment record already exists
      const existingPayment = await this.prisma.payment.findFirst({
        where: {
          OR: [
            { gatewayPaymentId },
            ...(gatewayOrderId ? [{ gatewayOrderId }] : []),
          ],
        },
      });

      if (existingPayment && existingPayment.status === 'captured') {
        this.logger.log(`Idempotency trigger: Payment ${gatewayPaymentId} already processed.`);
        return { success: true, idempotent: true, message: 'Webhook already processed' };
      }

      // Find order
      const order = await this.prisma.order.findFirst({
        where: {
          OR: [
            ...(orderId ? [{ id: orderId }] : []),
            ...(gatewayOrderId ? [{ payments: { some: { gatewayOrderId } } }] : []),
          ],
        },
        include: { user: true },
      });

      if (!order) {
        this.logger.error(`Order not found for webhook payment ${gatewayPaymentId}`);
        return { success: false, message: 'Order reference not found' };
      }

      // Transactionally update Payment & Order status
      await this.prisma.$transaction(async (tx) => {
        await tx.payment.upsert({
          where: { gatewayPaymentId },
          update: {
            status: 'captured',
            amount,
            rawWebhookPayload: payload,
          },
          create: {
            orderId: order.id,
            gatewayPaymentId,
            gatewayOrderId,
            amount,
            status: 'captured',
            rawWebhookPayload: payload,
          },
        });

        await tx.order.update({
          where: { id: order.id },
          data: { status: OrderStatus.CONFIRMED },
        });
      });

      // Send SMS Confirmation (Strict Channel Rule)
      await this.smsService.sendOrderConfirmation(order.user.phone, order.id, order.total);

      // Async trigger invoice PDF generation & SendGrid email (Strict Channel Rule)
      setImmediate(async () => {
        try {
          await this.invoicesService.generateFinalInvoice(order.id);
        } catch (err) {
          this.logger.error(`Failed background invoice generation for order ${order.id}`, err);
        }
      });

      return { success: true, message: 'Payment confirmed and invoice triggered' };
    }

    return { success: true, message: 'Event ignored' };
  }
}
