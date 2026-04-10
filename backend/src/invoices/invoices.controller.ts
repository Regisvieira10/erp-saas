import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvoicesService } from './invoices.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('invoices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar notas fiscais' })
  findAll(@Request() req) {
    return this.invoicesService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar nota fiscal' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.invoicesService.findOne(id, req.user.tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar nota fiscal' })
  create(@Request() req, @Body() data: any) {
    return this.invoicesService.create(req.user.tenantId, data);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Atualizar status da nota' })
  updateStatus(@Param('id') id: string, @Request() req, @Body() body: { status: string }) {
    return this.invoicesService.updateStatus(id, req.user.tenantId, body.status);
  }
}
