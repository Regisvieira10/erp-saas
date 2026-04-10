import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async findAll(tenantId: string) {
    return this.prisma.customer.findMany({
      where: { tenantId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, tenantId: string) {
    return this.prisma.customer.findFirst({
      where: { id, tenantId },
    });
  }

  async create(tenantId: string, data: any) {
    return this.prisma.customer.create({
      data: { ...data, tenantId },
    });
  }

  async update(id: string, tenantId: string, data: any) {
    return this.prisma.customer.update({
      where: { id },
      data,
    });
  }

  async delete(id: string, tenantId: string) {
    return this.prisma.customer.delete({ where: { id } });
  }
}
