import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tenant.findMany();
  }

  async findByDomain(domain: string) {
    return this.prisma.tenant.findUnique({ where: { domain } });
  }

  async update(id: string, data: any) {
    return this.prisma.tenant.update({ where: { id }, data });
  }

  async getStats(tenantId: string) {
    const [users, products, customers, orders] = await Promise.all([
      this.prisma.user.count({ where: { tenantId } }),
      this.prisma.product.count({ where: { tenantId } }),
      this.prisma.customer.count({ where: { tenantId } }),
      this.prisma.order.count({ where: { tenantId } }),
    ]);
    return { users, products, customers, orders };
  }
}
