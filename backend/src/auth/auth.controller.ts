import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  private jwtService = new JwtService({ secret: 'erp-a-firma-secret-2024' });

  @Post('register')
  @ApiOperation({ summary: 'Registrar novo tenant e usuário' })
  async register(@Body() body: {
    tenantName: string;
    domain: string;
    userName: string;
    email: string;
    password: string;
  }) {
    try {
      const tenant = await this.prisma.tenant.create({
        data: { name: body.tenantName, domain: body.domain }
      });
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const user = await this.prisma.user.create({
        data: { tenantId: tenant.id, name: body.userName, email: body.email, password: hashedPassword, role: 'ADMIN' }
      });
      const token = this.jwtService.sign({ sub: user.id, email: user.email, tenantId: user.tenantId });
      return { token, user: { id: user.id, name: user.name, email: user.email }, tenant: { id: tenant.id, name: tenant.name, domain: tenant.domain } };
    } catch (e) {
      console.error(e);
      return { error: e.message };
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login de usuário' })
  async login(@Body() body: { email: string; password: string; tenantDomain: string }) {
    try {
      const tenant = await this.prisma.tenant.findUnique({ where: { domain: body.tenantDomain } });
      if (!tenant) return { error: 'Empresa não encontrada' };
      const user = await this.prisma.user.findFirst({ where: { tenantId: tenant.id, email: body.email } });
      if (!user) return { error: 'Usuário não encontrado' };
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (!validPassword) return { error: 'Senha inválida' };
      const token = this.jwtService.sign({ sub: user.id, email: user.email, tenantId: user.tenantId });
      return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role }, tenant: { id: tenant.id, name: tenant.name, domain: tenant.domain } };
    } catch (e) {
      console.error(e);
      return { error: e.message };
    }
  }
}