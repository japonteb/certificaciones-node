import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ComandoRegistrarExamen } from 'src/aplicacion/examen/comando/registrar-examen.comando';
import { ManejadorRegistrarExamen } from 'src/aplicacion/examen/comando/registrar-examen.manejador';
import { ManejadorListarExamenPorCliente } from 'src/aplicacion/examen/consulta/listar-examenes-por-cliente.manejador';
import { ExamenDto } from 'src/aplicacion/examen/consulta/dto/examen.dto';

@Controller('examenes')
export class ExamenControlador {
  constructor(
    private readonly _manejadorRegistrarExamen: ManejadorRegistrarExamen,
    private readonly _manejadorListarExamenPorCliente: ManejadorListarExamenPorCliente
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoRegistrarExamen: ComandoRegistrarExamen) {
    await this._manejadorRegistrarExamen.ejecutar(comandoRegistrarExamen);
  }

  @Get('clientes/:id')
  async listarExamenesPorClienteId(
    @Param('id') clienteId: number
  ): Promise<ExamenDto[]> {
    return this._manejadorListarExamenPorCliente.ejecutar(clienteId);
  }
}
