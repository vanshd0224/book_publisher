import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class ManualStatusOverrideDto {
  @ApiProperty({ enum: OrderStatus })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiPropertyOptional({ example: 'Courier delay resolved, manually dispatched via BlueDart tracking #BD12345' })
  @IsOptional()
  @IsString()
  reason?: string;
}

export class TdsReconciliationDto {
  @ApiProperty({ example: 350.0, description: 'Actual TDS amount received from institutional buyer' })
  @IsNumber()
  @Min(0)
  tdsReceived: number;
}

export class CreateDiscountTierDto {
  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(1)
  minQuantity: number;

  @ApiPropertyOptional({ example: 19, description: 'Null for open upper bound (e.g. 20+)' })
  @IsOptional()
  @IsInt()
  maxQuantity?: number;

  @ApiProperty({ example: 15.0, description: 'Discount percentage' })
  @IsNumber()
  @Min(0)
  discountPercent: number;
}
