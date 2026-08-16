import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly isConfigured: boolean = false;
  private readonly fromEmail: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    this.fromEmail = this.configService.get<string>('SENDGRID_FROM_EMAIL') || 'invoices@bookpublisher.com';
    if (apiKey && !apiKey.includes('xxxxxx')) {
      sgMail.setApiKey(apiKey);
      this.isConfigured = true;
    }
  }

  /**
   * SendGrid is used EXCLUSIVELY for delivering the generated Invoice PDF to buyers.
   */
  async sendInvoicePdf(
    toEmail: string,
    orderId: string,
    pdfBuffer: Buffer,
    filename: string = 'Invoice.pdf',
  ): Promise<boolean> {
    this.logger.log(`[EMAIL-INVOICE] Delivering invoice PDF for Order #${orderId} to ${toEmail}`);

    if (!this.isConfigured) {
      this.logger.warn(`SendGrid API Key not configured. Simulated sending invoice PDF to ${toEmail}`);
      return true;
    }

    try {
      const msg = {
        to: toEmail,
        from: this.fromEmail,
        subject: `Tax Invoice for Order #${orderId} - Essentials of Medical Device Clinical Research`,
        text: `Dear Customer,\n\nPlease find attached the tax invoice for your order #${orderId}.\n\nThank you for choosing Essentials of Medical Device Clinical Research.\n\nBest regards,\nBook Publisher Platform`,
        attachments: [
          {
            content: pdfBuffer.toString('base64'),
            filename,
            type: 'application/pdf',
            disposition: 'attachment',
          },
        ],
      };

      await sgMail.send(msg);
      this.logger.log(`Invoice PDF email sent successfully to ${toEmail}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send invoice email to ${toEmail}`, error);
      return false;
    }
  }
}
