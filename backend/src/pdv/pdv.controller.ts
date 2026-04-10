import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PdvService } from './pdv.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('pdv')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('pdv')
export class PdvController {
  constructor(private pdvService: PdvService) {}

  @Post('open')
  @ApiOperation({ summary: 'Abrir caixa' })
  openCash(@Request() req, @Body() body: { openValue: number }) {
    return this.pdvService.openCash(req.user.tenantId, req.user.id, body.openValue);
  }

  @Post('close/:id')
  @ApiOperation({ summary: 'Fechar caixa' })
  closeCash(@Param('id') id: string, @Body() body: { closeValue: number }) {
    return this.pdvService.closeCash(id, body.closeValue);
  }

  @Get('current')
  @ApiOperation({ summary: 'Caixa atual' })
  getCurrentCash(@Request() req) {
    return this.pdvService.getCurrentCash(req.user.tenantId);
  }

  @Post('item')
  @ApiOperation({ summary: 'Adicionar item' })
  addItem(@Body() body: { cashId: string; productId: string; productName: string; productCode?: string; quantity: number; unitPrice: number; total: number }) {
    return this.pdvService.addItem(body.cashId, body);
  }

  @Get('items/:cashId')
  @ApiOperation({ summary: 'Listar itens do caixa' })
  getCashItems(@Param('cashId') cashId: string) {
    return this.pdvService.getCashItems(cashId);
  }
}
