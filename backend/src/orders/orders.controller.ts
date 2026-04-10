import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar pedidos' })
  findAll(@Request() req) {
    return this.ordersService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pedido' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.ordersService.findOne(id, req.user.tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar pedido' })
  create(@Request() req, @Body() data: any) {
    return this.ordersService.create(req.user.tenantId, data);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Atualizar status do pedido' })
  updateStatus(@Param('id') id: string, @Request() req, @Body() body: { status: string }) {
    return this.ordersService.updateStatus(id, req.user.tenantId, body.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir pedido' })
  delete(@Param('id') id: string, @Request() req) {
    return this.ordersService.delete(id, req.user.tenantId);
  }
}
