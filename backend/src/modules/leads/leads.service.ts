import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateLeadDto, UpdateLeadStatusDto } from './dto/lead.dto';
import { LeadStatus } from '@prisma/client';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  async createLead(dto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        collegeName: dto.collegeName,
        source: dto.source || 'FORM',
        notes: dto.notes,
      },
    });
  }

  async getLeads(status?: LeadStatus) {
    const where: any = {};
    if (status) {
      where.status = status;
    }

    return this.prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateLeadStatus(id: string, dto: UpdateLeadStatusDto) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return this.prisma.lead.update({
      where: { id },
      data: {
        status: dto.status,
        ...(dto.notes ? { notes: dto.notes } : {}),
      },
    });
  }
}
