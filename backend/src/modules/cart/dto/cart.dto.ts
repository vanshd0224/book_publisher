import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 'prod_uuid_here' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ example: 5, default: 1 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiPropertyOptional({ example: 'guest-session-12345' })
  @IsOptional()
  @IsString()
  sessionId?: string;
}

export class UpdateCartItemDto {
  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  quantity: number;
}
