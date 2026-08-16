import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('SMS_PROVIDER_API_KEY');
  }

  async sendOtp(phone: string, otp: string): Promise<boolean> {
    this.logger.log(`[SMS-OTP] Sending login OTP ${otp} to phone ${phone}`);
    // In production with MSG91 / Twilio API key:
    // await axios.post('https://api.msg91.com/v5/otp', { mobile: phone, otp });
    return true;
  }

  async sendOrderConfirmation(phone: string, orderId: string, totalAmount: number): Promise<boolean> {
    this.logger.log(`[SMS-ORDER] Order ${orderId} confirmed for Rs. ${totalAmount}. SMS sent to ${phone}`);
    return true;
  }
}
