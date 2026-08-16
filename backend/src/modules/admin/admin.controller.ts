import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateDiscountTierDto, ManualStatusOverrideDto, TdsReconciliationDto } from './dto/admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Admin Dashboard')
@Controller('api/v1/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get admin dashboard metrics, revenue stats, & pending institutional approvals' })
  async getDashboardOverview() {
    return this.adminService.getDashboardOverview();
  }

  @Put('orders/:id/manual-override')
  @ApiOperation({ summary: 'Manual status override capability for orders (PO delays, courier issues)' })
  async manualStatusOverride(
    @Param('id') id: string,
    @Body() dto: ManualStatusOverrideDto,
  ) {
    return this.adminService.manualStatusOverride(id, dto);
  }

  @Put('orders/:id/tds-reconciliation')
  @ApiOperation({ summary: 'Update actual received TDS amount for institutional order reconciliation' })
  async updateTdsReconciliation(
    @Param('id') id: string,
    @Body() dto: TdsReconciliationDto,
  ) {
    return this.adminService.updateTdsReconciliation(id, dto);
  }

  @Get('discount-tiers')
  @ApiOperation({ summary: 'Get configured bulk discount tiers' })
  async getDiscountTiers() {
    return this.adminService.getDiscountTiers();
  }

  @Post('discount-tiers')
  @ApiOperation({ summary: 'Add a new bulk discount tier' })
  async createDiscountTier(@Body() dto: CreateDiscountTierDto) {
    return this.adminService.createDiscountTier(dto);
  }

  @Delete('discount-tiers/:id')
  @ApiOperation({ summary: 'Delete a bulk discount tier' })
  async deleteDiscountTier(@Param('id') id: string) {
    return this.adminService.deleteDiscountTier(id);
  }
}
