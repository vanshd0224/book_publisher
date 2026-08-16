import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterProductDto {
  @ApiPropertyOptional({ example: 1, description: 'Volume number (1, 2, 3, or 0 for bundle)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  volumeNumber?: number;
}

export class CreateProductDto {
  @ApiProperty({ example: 'Essentials of Medical Device Clinical Research - Volume 1' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 1, description: '1, 2, 3, or 0 for bundle' })
  @IsInt()
  volumeNumber: number;

  @ApiProperty({ example: 3500.0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 500 })
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: '978-81-950000-1-0' })
  @IsString()
  isbn: string;

  @ApiProperty({ example: 'Comprehensive volume covering fundamental principles and regulations...' })
  @IsString()
  description: string;

  @ApiProperty({ example: ['https://storage.googleapis.com/book-publisher-assets/vol1.jpg'] })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiPropertyOptional({ example: '4901' })
  @IsOptional()
  @IsString()
  hsnCode?: string;

  @ApiPropertyOptional({ example: 0.0 })
  @IsOptional()
  @IsNumber()
  gstRate?: number;
}

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  volumeNumber?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  stock?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  images?: string[];
}
