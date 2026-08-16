import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Invoices')
@Controller('api/v1/orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get(':id/invoice')
  @ApiOperation({ summary: 'Get latest invoice details and PDF URL for an order' })
  async getInvoice(@Param('id') id: string) {
    return this.invoicesService.getInvoiceByOrderId(id);
  }

  @Post(':id/generate-proforma')
  @ApiOperation({ summary: 'Generate Proforma Invoice PDF for institutional pre-approval' })
  async generateProforma(@Param('id') id: string) {
    return this.invoicesService.generateProformaInvoice(id);
  }
}
