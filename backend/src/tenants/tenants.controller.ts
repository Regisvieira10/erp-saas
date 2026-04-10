import { Controller, Get, Put, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TenantsService } from './tenants.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('tenants')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('tenants')
export class TenantsController {
  constructor(private tenantsService: TenantsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar tenants' })
  findAll() {
    return this.tenantsService.findAll();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Estatísticas do tenant' })
  async getStats() {
    return { users: 0, products: 0, customers: 0, orders: 0 };
  }

  @Get(':domain')
  @ApiOperation({ summary: 'Buscar tenant por domínio' })
  findByDomain(@Param('domain') domain: string) {
    return this.tenantsService.findByDomain(domain);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar tenant' })
  update(@Param('id') id: string, @Body() data: any) {
    return this.tenantsService.update(id, data);
  }
}
