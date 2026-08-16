import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { CollegeType, Role } from '@prisma/client';

export class SignupDto {
  @ApiProperty({ example: 'user@medicalcollege.edu.in' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+919876543210' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: 'SecurePass@123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: Role, default: Role.INDIVIDUAL })
  @IsEnum(Role)
  role: Role;

  // Institutional Buyer fields
  @ApiPropertyOptional({ example: 'All India Institute of Medical Sciences (AIIMS)' })
  @IsOptional()
  @IsString()
  collegeName?: string;

  @ApiPropertyOptional({ example: '07AAAAA0000A1Z5' })
  @IsOptional()
  @IsString()
  gstin?: string;

  @ApiPropertyOptional({ example: 'Medical Enclave, Ansari Nagar, New Delhi - 110029' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ example: 'Chief Librarian / Procurement Officer' })
  @IsOptional()
  @IsString()
  designation?: string;

  @ApiPropertyOptional({ enum: CollegeType, default: CollegeType.GOVT })
  @IsOptional()
  @IsEnum(CollegeType)
  collegeType?: CollegeType;
}

export class LoginDto {
  @ApiProperty({ example: 'user@medicalcollege.edu.in' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePass@123' })
  @IsString()
  password: string;
}

export class VerifyOtpDto {
  @ApiProperty({ example: '+919876543210' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  otp: string;
}

export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: '+919876543210' })
  @IsString()
  phone: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: '+919876543210' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  otp: string;

  @ApiProperty({ example: 'NewSecurePass@123' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
