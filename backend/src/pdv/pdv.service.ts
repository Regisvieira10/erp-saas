import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PdvService {
  constructor(private prisma: PrismaService) {}

  async openCash(tenantId: string, userId: string, openValue: number) {
    return this.prisma.pdvCash.create({
      data: { tenantId, userId, openValue, currentValue: openValue, status: 'OPEN' },
    });
  }

  async closeCash(id: string, closeValue: number) {
    return this.prisma.pdvCash.update({
      where: { id },
      data: { closeValue, currentValue: closeValue, status: 'CLOSED', closedAt: new Date() },
    });
  }

  async getCurrentCash(tenantId: string) {
    return this.prisma.pdvCash.findFirst({
      where: { tenantId, status: 'OPEN' },
      orderBy: { openedAt: 'desc' },
    });
  }

  async addItem(cashId: string, data: any) {
    const item = await this.prisma.pdvCashItem.create({
      data: { cashId, productId: data.productId, productName: data.productName, productCode: data.productCode, quantity: data.quantity, unitPrice: data.unitPrice, total: data.total },
    });
    const cash = await this.prisma.pdvCash.findUnique({ where: { id: cashId } });
    await this.prisma.pdvCash.update({
      where: { id: cashId },
      data: { currentValue: cash!.currentValue + data.total },
    });
    return item;
  }

  async getCashItems(cashId: string) {
    return this.prisma.pdvCashItem.findMany({ where: { cashId } });
  }
}
