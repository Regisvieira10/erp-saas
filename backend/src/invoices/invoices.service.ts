import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.invoice.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.invoice.findFirst({
      where: { id, tenantId },
      include: { items: true },
    });
  }

  async create(tenantId: string, data: any) {
    const invoice = await this.prisma.invoice.create({
      data: {
        tenantId,
        invoiceNumber: data.invoiceNumber,
        serie: data.serie,
        type: data.type,
        customerName: data.customerName,
        customerDocument: data.customerDocument,
        subtotal: data.subtotal,
        discount: data.discount,
        total: data.total,
        status: 'DRAFT',
      },
    });

    if (data.items && data.items.length > 0) {
      await this.prisma.invoiceItem.createMany({
        data: data.items.map((item: any) => ({
          invoiceId: invoice.id,
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.total,
        })),
      });
    }

    return this.findOne(invoice.id, tenantId);
  }

  async updateStatus(id: string, tenantId: string, status: string) {
    return this.prisma.invoice.update({
      where: { id },
      data: { status, issuedAt: status === 'ISSUED' ? new Date() : undefined },
    });
  }
}
