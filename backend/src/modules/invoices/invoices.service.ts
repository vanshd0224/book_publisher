import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { StorageService } from '../storage/storage.service';
import { EmailService } from '../notifications/email.service';
import { InvoiceType } from '@prisma/client';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(
    private prisma: PrismaService,
    private storageService: StorageService,
    private emailService: EmailService,
  ) {}

  async getInvoiceByOrderId(orderId: string) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { orderId },
      orderBy: { createdAt: 'desc' },
      include: { order: { include: { items: { include: { product: true } }, user: { include: { institutionProfile: true } } } } },
    });

    if (!invoice) {
      throw new NotFoundException(`No invoice found for order ID ${orderId}`);
    }

    return invoice;
  }

  async generateProformaInvoice(orderId: string) {
    return this.createInvoicePdf(orderId, InvoiceType.PROFORMA);
  }

  async generateFinalInvoice(orderId: string) {
    return this.createInvoicePdf(orderId, InvoiceType.FINAL);
  }

  private async createInvoicePdf(orderId: string, type: InvoiceType) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: { include: { product: true } },
        user: { include: { institutionProfile: true } },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    // Build PDF Document in-house using pdf-lib
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const { width, height } = page.getSize();
    const margin = 40;

    // Header Title
    const invoiceTitle = type === InvoiceType.PROFORMA ? 'PROFORMA INVOICE' : 'TAX INVOICE';
    page.drawText(invoiceTitle, {
      x: margin,
      y: height - 50,
      size: 20,
      font: fontBold,
      color: rgb(0.1, 0.2, 0.4),
    });

    // Publisher & Tax Info
    page.drawText('Publisher: Essentials of Medical Device Clinical Research', {
      x: margin,
      y: height - 75,
      size: 10,
      font,
    });
    page.drawText('Author: Dr. Ashish Indani | GSTIN: 07AAACB1234C1Z1', {
      x: margin,
      y: height - 90,
      size: 9,
      font,
    });

    // Invoice Metadata Box
    const invNo = `${type === InvoiceType.PROFORMA ? 'PROF' : 'INV'}-${order.id.slice(0, 8).toUpperCase()}`;
    page.drawText(`Invoice No: ${invNo}`, { x: width - 200, y: height - 50, size: 10, font: fontBold });
    page.drawText(`Date: ${new Date().toLocaleDateString('en-IN')}`, { x: width - 200, y: height - 65, size: 9, font });
    page.drawText(`Order ID: ${order.id}`, { x: width - 200, y: height - 80, size: 9, font });

    // Buyer Information
    let yPos = height - 125;
    page.drawText('Billed To:', { x: margin, y: yPos, size: 11, font: fontBold });
    yPos -= 15;
    page.drawText(`Email: ${order.user.email} | Phone: ${order.user.phone}`, { x: margin, y: yPos, size: 9, font });

    if (order.user.institutionProfile) {
      const inst = order.user.institutionProfile;
      yPos -= 15;
      page.drawText(`College/Inst: ${inst.collegeName}`, { x: margin, y: yPos, size: 9, font: fontBold });
      if (inst.gstin) {
        yPos -= 15;
        page.drawText(`GSTIN: ${inst.gstin}`, { x: margin, y: yPos, size: 9, font });
      }
    }
    yPos -= 15;
    page.drawText(`Address: ${order.shippingAddress || 'N/A'}`, { x: margin, y: yPos, size: 9, font });

    // Table Header
    yPos -= 30;
    page.drawRectangle({
      x: margin,
      y: yPos - 5,
      width: width - margin * 2,
      height: 20,
      color: rgb(0.9, 0.93, 0.98),
    });

    page.drawText('Item Description', { x: margin + 5, y: yPos, size: 9, font: fontBold });
    page.drawText('HSN', { x: 300, y: yPos, size: 9, font: fontBold });
    page.drawText('Qty', { x: 360, y: yPos, size: 9, font: fontBold });
    page.drawText('Rate (Rs)', { x: 410, y: yPos, size: 9, font: fontBold });
    page.drawText('Amount (Rs)', { x: 490, y: yPos, size: 9, font: fontBold });

    // Table Rows
    yPos -= 25;
    for (const item of order.items) {
      const titleShort = item.product.title.length > 42 ? item.product.title.substring(0, 42) + '...' : item.product.title;
      page.drawText(titleShort, { x: margin + 5, y: yPos, size: 8, font });
      page.drawText(item.product.hsnCode || '4901', { x: 300, y: yPos, size: 8, font });
      page.drawText(item.quantity.toString(), { x: 360, y: yPos, size: 8, font });
      page.drawText(item.unitPrice.toFixed(2), { x: 410, y: yPos, size: 8, font });
      page.drawText((item.unitPrice * item.quantity).toFixed(2), { x: 490, y: yPos, size: 8, font });
      yPos -= 20;
    }

    // Totals Section
    yPos -= 10;
    page.drawLine({ start: { x: margin, y: yPos }, end: { x: width - margin, y: yPos }, thickness: 1, color: rgb(0.8, 0.8, 0.8) });
    yPos -= 20;
    page.drawText(`Subtotal: Rs. ${order.subtotal.toFixed(2)}`, { x: width - 200, y: yPos, size: 9, font });
    yPos -= 15;
    page.drawText(`Discount Applied: Rs. ${order.discountApplied.toFixed(2)}`, { x: width - 200, y: yPos, size: 9, font });
    yPos -= 15;
    page.drawText(`GST Amount (Printed Books 0%): Rs. ${order.gstAmount.toFixed(2)}`, { x: width - 200, y: yPos, size: 9, font });
    yPos -= 20;
    page.drawText(`TOTAL PAYABLE: Rs. ${order.total.toFixed(2)}`, { x: width - 200, y: yPos, size: 11, font: fontBold, color: rgb(0.1, 0.4, 0.1) });

    // Footer Compliance Note
    yPos -= 40;
    page.drawText('Compliance Note: Printed books are exempt from GST under HSN Code 4901.', { x: margin, y: yPos, size: 8, font });

    const pdfBytes = await pdfDoc.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    // Save to Storage
    const filename = `${type}_Invoice_${order.id}_${Date.now()}.pdf`;
    const pdfUrl = await this.storageService.uploadFile(pdfBuffer, filename, 'invoices');

    // Create Invoice DB Record
    const invoice = await this.prisma.invoice.create({
      data: {
        orderId: order.id,
        type,
        pdfUrl,
        gstAmount: order.gstAmount,
        irn: `IRN-${Date.now()}-${order.id.slice(0, 6)}`,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?data=INV-${order.id}`,
      },
    });

    // Deliver via SendGrid Email (Strict Channel Rule: Invoice delivery only)
    await this.emailService.sendInvoicePdf(order.user.email, order.id, pdfBuffer, filename);

    return invoice;
  }
}
