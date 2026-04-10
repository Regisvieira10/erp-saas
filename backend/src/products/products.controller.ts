import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar produtos' })
  findAll(@Request() req) {
    return this.productsService.findAll(req.user.tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.productsService.findOne(id, req.user.tenantId);
  }

  @Post()
  @ApiOperation({ summary: 'Criar produto' })
  create(@Request() req, @Body() data: any) {
    return this.productsService.create(req.user.tenantId, data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar produto' })
  update(@Param('id') id: string, @Request() req, @Body() data: any) {
    return this.productsService.update(id, req.user.tenantId, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir produto' })
  delete(@Param('id') id: string, @Request() req) {
    return this.productsService.delete(id, req.user.tenantId);
  }
}
