import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string, tenantDomain: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { domain: tenantDomain },
    });
    if (!tenant) {
      throw new Error('Tenant não encontrado');
    }

    const user = await this.prisma.user.findFirst({
      where: { tenantId: tenant.id, email },
    });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Senha inválida');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        tenant: { id: tenant.id, name: tenant.name, domain: tenant.domain },
      },
    };
  }

  async register(data: {
    tenantName: string;
    domain: string;
    userName: string;
    email: string;
    password: string;
  }) {
    const tenant = await this.prisma.tenant.create({
      data: {
        name: data.tenantName,
        domain: data.domain,
      },
    });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        tenantId: tenant.id,
        name: data.userName,
        email: data.email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      tenantId: user.tenantId,
      role: user.role,
    });

    return { token, user, tenant };
  }
}
