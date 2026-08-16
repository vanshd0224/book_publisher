import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './dto/cart.dto';
import { OptionalJwtAuthGuard } from './guards/optional-jwt.guard';

@ApiTags('Cart')
@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Get current user or session cart with dynamic bulk discount calculation' })
  async getCart(@Req() req: any, @Query('sessionId') sessionId?: string) {
    const userId = req.user?.id;
    return this.cartService.getCart(userId, sessionId);
  }

  @Post('add')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Add item to cart' })
  async addToCart(@Req() req: any, @Body() dto: AddToCartDto) {
    const userId = req.user?.id;
    return this.cartService.addToCart(dto, userId);
  }

  @Put('update/:itemId')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Update cart item quantity' })
  async updateCartItem(
    @Req() req: any,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    const userId = req.user?.id;
    return this.cartService.updateCartItem(itemId, dto, userId);
  }

  @Delete('remove/:itemId')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Remove item from cart' })
  async removeCartItem(@Req() req: any, @Param('itemId') itemId: string) {
    const userId = req.user?.id;
    return this.cartService.removeCartItem(itemId, userId);
  }
}
