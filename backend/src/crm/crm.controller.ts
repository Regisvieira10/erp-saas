import { Controller, Get, Post, Put, Param, Body, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CrmService } from './crm.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('crm')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('crm')
export class CrmController {
  constructor(private crmService: CrmService) {}

  @Get('leads')
  @ApiOperation({ summary: 'Listar leads' })
  getLeads(@Request() req) {
    return this.crmService.getLeads(req.user.tenantId);
  }

  @Post('leads')
  @ApiOperation({ summary: 'Criar lead' })
  createLead(@Request() req, @Body() data: any) {
    return this.crmService.createLead(req.user.tenantId, data);
  }

  @Put('leads/:id')
  @ApiOperation({ summary: 'Atualizar lead' })
  updateLead(@Param('id') id: string, @Request() req, @Body() data: any) {
    return this.crmService.updateLead(id, req.user.tenantId, data);
  }

  @Get('deals')
  @ApiOperation({ summary: 'Listar oportunidades' })
  getDeals(@Request() req) {
    return this.crmService.getDeals(req.user.tenantId);
  }

  @Post('deals')
  @ApiOperation({ summary: 'Criar oportunidade' })
  createDeal(@Request() req, @Body() data: any) {
    return this.crmService.createDeal(req.user.tenantId, data);
  }

  @Put('deals/:id')
  @ApiOperation({ summary: 'Atualizar oportunidade' })
  updateDeal(@Param('id') id: string, @Request() req, @Body() data: any) {
    return this.crmService.updateDeal(id, req.user.tenantId, data);
  }

  @Get('tasks')
  @ApiOperation({ summary: 'Listar tarefas' })
  getTasks(@Request() req) {
    return this.crmService.getTasks(req.user.tenantId);
  }

  @Post('tasks')
  @ApiOperation({ summary: 'Criar tarefa' })
  createTask(@Request() req, @Body() data: any) {
    return this.crmService.createTask(req.user.tenantId, data);
  }

  @Put('tasks/:id')
  @ApiOperation({ summary: 'Atualizar tarefa' })
  updateTask(@Param('id') id: string, @Request() req, @Body() data: any) {
    return this.crmService.updateTask(id, req.user.tenantId, data);
  }

  @Get('activities')
  @ApiOperation({ summary: 'Listar atividades' })
  getActivities(@Request() req) {
    return this.crmService.getActivities(req.user.tenantId);
  }

  @Post('activities')
  @ApiOperation({ summary: 'Criar atividade' })
  createActivity(@Request() req, @Body() data: any) {
    return this.crmService.createActivity(req.user.tenantId, data);
  }

  @Get('notes')
  @ApiOperation({ summary: 'Listar notas' })
  getNotes(@Request() req, @Query('leadId') leadId?: string) {
    return this.crmService.getNotes(req.user.tenantId, leadId);
  }

  @Post('notes')
  @ApiOperation({ summary: 'Criar nota' })
  createNote(@Request() req, @Body() data: any) {
    return this.crmService.createNote(req.user.tenantId, data);
  }
}
