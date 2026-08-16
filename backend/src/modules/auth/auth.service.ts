import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../database/prisma.service';
import { SmsService } from '../notifications/sms.service';
import { SignupDto, LoginDto, VerifyOtpDto, RefreshTokenDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private smsService: SmsService,
  ) {}

  async signup(dto: SignupDto) {
    const existingEmail = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingEmail) {
      throw new BadRequestException('Email already registered');
    }

    const existingPhone = await this.prisma.user.findUnique({ where: { phone: dto.phone } });
    if (existingPhone) {
      throw new BadRequestException('Phone number already registered');
    }

    if (dto.role === Role.INSTITUTION && !dto.collegeName) {
      throw new BadRequestException('Institutional accounts require collegeName and address');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        role: dto.role,
        ...(dto.role === Role.INSTITUTION
          ? {
              institutionProfile: {
                create: {
                  collegeName: dto.collegeName,
                  gstin: dto.gstin,
                  address: dto.address || '',
                  designation: dto.designation || 'Procurement',
                  collegeType: dto.collegeType || 'GOVT',
                  verified: false,
                },
              },
            }
          : {}),
      },
      include: {
        institutionProfile: true,
      },
    });

    // Send Login OTP via SMS
    const otp = '123456'; // Default test OTP / generated
    await this.smsService.sendOtp(user.phone, otp);

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        institutionProfile: user.institutionProfile,
      },
      ...tokens,
    };
  }

  async login(dto: LoginDto) {
    let user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { institutionProfile: true },
    });

    if (!user) {
      // Check admin users table if not in users table
      const admin = await this.prisma.adminUser.findUnique({ where: { email: dto.email } });
      if (admin) {
        const isPasswordValid = await bcrypt.compare(dto.password, admin.passwordHash);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
        const tokens = await this.generateTokens(admin.id, admin.email, admin.role);
        return {
          user: { id: admin.id, email: admin.email, role: admin.role },
          ...tokens,
        };
      }
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        institutionProfile: user.institutionProfile,
      },
      ...tokens,
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    if (dto.otp !== '123456') {
      throw new BadRequestException('Invalid or expired OTP');
    }
    return { verified: true, message: 'OTP verified successfully' };
  }

  async refreshToken(dto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(dto.refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'super-secret-jwt-refresh-key-book-publisher-2026',
      });
      const tokens = await this.generateTokens(payload.sub, payload.email, payload.role);
      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { phone: dto.phone } });
    if (!user) {
      throw new BadRequestException('No account found associated with this phone number');
    }
    await this.smsService.sendOtp(dto.phone, '123456');
    return { message: 'Password reset OTP sent to registered mobile number' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.otp !== '123456') {
      throw new BadRequestException('Invalid OTP');
    }

    const user = await this.prisma.user.findUnique({ where: { phone: dto.phone } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    return { message: 'Password reset successfully' };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };
    const accessTokenSecret = this.configService.get<string>('JWT_SECRET') || 'super-secret-jwt-access-key-book-publisher-2026';
    const refreshTokenSecret = this.configService.get<string>('JWT_REFRESH_SECRET') || 'super-secret-jwt-refresh-key-book-publisher-2026';

    const accessToken = this.jwtService.sign(payload, {
      secret: accessTokenSecret,
      expiresIn: '1d',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: refreshTokenSecret,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
