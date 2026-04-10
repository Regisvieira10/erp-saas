import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.order.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.order.findFirst({
      where: { id, tenantId },
      include: { items: true },
    });
  }

  async create(tenantId: string, data: any) {
    const order = await this.prisma.order.create({
      data: {
        tenantId,
        orderNumber: data.orderNumber,
        customerId: data.customerId,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerDocument: data.customerDocument,
        customerAddress: data.customerAddress,
        subtotal: data.subtotal,
        discount: data.discount,
        total: data.total,
        status: 'PENDING',
        paymentMethod: data.paymentMethod,
        notes: data.notes,
      },
    });

    if (data.items && data.items.length > 0) {
      await this.prisma.orderItem.createMany({
        data: data.items.map((item: any) => ({
          orderId: order.id,
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          total: item.total,
        })),
      });
    }

    return this.findOne(order.id, tenantId);
  }

  async updateStatus(id: string, tenantId: string, status: string) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async delete(id: string, tenantId: string) {
    await this.prisma.orderItem.deleteMany({ where: { orderId: id } });
    return this.prisma.order.delete({ where: { id } });
  }
}
