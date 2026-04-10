import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomersService } from './customers.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('customers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar clientes' })
  findAll(@Request() req) {
    return this.customersService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar cliente' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.customersService.findOne(id, req.user.tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar cliente' })
  create(@Request() req, @Body() data: any) {
    return this.customersService.create(req.user.tenantId, data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar cliente' })
  update(@Param('id') id: string, @Request() req, @Body() data: any) {
    return this.customersService.update(id, req.user.tenantId, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir cliente' })
  delete(@Param('id') id: string, @Request() req) {
    return this.customersService.delete(id, req.user.tenantId);
  }
}
