import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  async getLeads(tenantId: string) {
    return this.prisma.lead.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } });
  }

  async createLead(tenantId: string, data: any) {
    return this.prisma.lead.create({ data: { ...data, tenantId } });
  }

  async updateLead(id: string, tenantId: string, data: any) {
    return this.prisma.lead.update({ where: { id }, data });
  }

  async getDeals(tenantId: string) {
    return this.prisma.deal.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' } });
  }

  async createDeal(tenantId: string, data: any) {
    return this.prisma.deal.create({ data: { ...data, tenantId } });
  }

  async updateDeal(id: string, tenantId: string, data: any) {
    return this.prisma.deal.update({ where: { id }, data });
  }

  async getTasks(tenantId: string) {
    return this.prisma.task.findMany({ where: { tenantId }, orderBy: { dueDate: 'asc' } });
  }

  async createTask(tenantId: string, data: any) {
    return this.prisma.task.create({ data: { ...data, tenantId } });
  }

  async updateTask(id: string, tenantId: string, data: any) {
    return this.prisma.task.update({ where: { id }, data });
  }

  async getActivities(tenantId: string) {
    return this.prisma.activity.findMany({ where: { tenantId }, orderBy: { createdAt: 'desc' }, take: 50 });
  }

  async createActivity(tenantId: string, data: any) {
    return this.prisma.activity.create({ data: { ...data, tenantId } });
  }

  async getNotes(tenantId: string, leadId?: string) {
    return this.prisma.note.findMany({ where: { tenantId, leadId }, orderBy: { createdAt: 'desc' } });
  }

  async createNote(tenantId: string, data: any) {
    return this.prisma.note.create({ data: { ...data, tenantId } });
  }
}
