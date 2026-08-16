import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateIndividualOrderDto, CreateInstitutionalOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Orders')
@Controller('api/v1/orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create individual checkout order (returns Razorpay order details)' })
  async createIndividualOrder(@Req() req: any, @Body() dto: CreateIndividualOrderDto) {
    return this.ordersService.createIndividualOrder(req.user.id, dto);
  }

  @Post('institutional')
  @ApiOperation({ summary: 'Create institutional bulk purchase order (PENDING_APPROVAL status, no live payment upfront)' })
  async createInstitutionalOrder(@Req() req: any, @Body() dto: CreateInstitutionalOrderDto) {
    return this.ordersService.createInstitutionalOrder(req.user.id, dto);
  }

  @Get('my-orders')
  @ApiOperation({ summary: 'Get current logged-in user order history' })
  async getUserOrders(@Req() req: any) {
    return this.ordersService.getUserOrders(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order details by order ID' })
  async getOrderById(@Req() req: any, @Param('id') id: string) {
    return this.ordersService.getOrderById(id, req.user.id);
  }

  @Put(':id/status')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Update order status through status pipeline (Admin only)' })
  async updateOrderStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(id, dto);
  }

  @Post(':id/upload-po')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload Purchase Order (PO) document for institutional orders' })
  async uploadPO(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('PO Document file is required');
    }
    return this.ordersService.uploadPO(id, file);
  }
}
