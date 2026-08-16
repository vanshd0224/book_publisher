import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LeadSource, LeadStatus } from '@prisma/client';

export class CreateLeadDto {
  @ApiProperty({ example: 'Dr. Ramesh Sharma' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'rsharma@kmc.edu.in' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+919812345678' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Kasturba Medical College, Manipal' })
  @IsString()
  @IsNotEmpty()
  collegeName: string;

  @ApiPropertyOptional({ enum: LeadSource, default: LeadSource.FORM })
  @IsOptional()
  @IsEnum(LeadSource)
  source?: LeadSource;

  @ApiPropertyOptional({ example: 'Inquiring for 50 hardcover sets for Central Library' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateLeadStatusDto {
  @ApiProperty({ enum: LeadStatus })
  @IsEnum(LeadStatus)
  status: LeadStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
