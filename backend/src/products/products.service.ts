import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.product.findFirst({
      where: { id, tenantId },
    });
  }

  async create(tenantId: string, data: any) {
    return this.prisma.product.create({
      data: { ...data, tenantId },
    });
  }

  async update(id: string, tenantId: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, tenantId: string) {
    return this.prisma.product.delete({ where: { id } });
  }

  async updateStock(id: string, tenantId: string, quantity: number) {
    const product = await this.prisma.product.findFirst({
      where: { id, tenantId },
    });
    if (!product) throw new Error('Produto não encontrado');
    
    return this.prisma.product.update({
      where: { id },
      data: { stock: product.stock + quantity },
    });
  }
}
