import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateDiscountTierDto, ManualStatusOverrideDto, TdsReconciliationDto } from './dto/admin.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardOverview() {
    const totalOrders = await this.prisma.order.count({ where: { deletedAt: null } });
    const pendingApprovals = await this.prisma.order.count({
      where: { status: OrderStatus.PENDING_APPROVAL, deletedAt: null },
    });
    const confirmedOrders = await this.prisma.order.count({
      where: { status: OrderStatus.CONFIRMED, deletedAt: null },
    });

    const revenueResult = await this.prisma.order.aggregate({
      _sum: { total: true, tdsExpected: true, tdsReceived: true },
      where: { status: { in: [OrderStatus.CONFIRMED, OrderStatus.DISPATCHED, OrderStatus.DELIVERED] }, deletedAt: null },
    });

    const totalLeads = await this.prisma.lead.count();
    const newLeads = await this.prisma.lead.count({ where: { status: 'CONTACTED' } });

    const recentOrders = await this.prisma.order.findMany({
      where: { deletedAt: null },
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { user: { include: { institutionProfile: true } }, items: true },
    });

    return {
      stats: {
        totalOrders,
        pendingApprovals,
        confirmedOrders,
        totalRevenue: revenueResult._sum.total || 0,
        tdsExpected: revenueResult._sum.tdsExpected || 0,
        tdsReceived: revenueResult._sum.tdsReceived || 0,
        totalLeads,
        newLeads,
      },
      recentOrders,
    };
  }

  async manualStatusOverride(orderId: string, dto: ManualStatusOverrideDto) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: dto.status },
    });
  }

  async updateTdsReconciliation(orderId: string, dto: TdsReconciliationDto) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException(`Order ${orderId} not found`);
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: { tdsReceived: dto.tdsReceived },
    });
  }

  async getDiscountTiers() {
    return this.prisma.discountTier.findMany({ orderBy: { minQuantity: 'asc' } });
  }

  async createDiscountTier(dto: CreateDiscountTierDto) {
    return this.prisma.discountTier.create({ data: dto });
  }

  async deleteDiscountTier(id: string) {
    return this.prisma.discountTier.delete({ where: { id } });
  }
}
