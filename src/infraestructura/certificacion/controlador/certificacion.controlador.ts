import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ComandoCertificacion } from 'src/aplicacion/certificacion/comando/certificacion.comando';
import { ManejadorEliminarCertificacion } from 'src/aplicacion/certificacion/comando/eliminar-certificacion.manejador';
import { ManejadorRegistrarCertificacion } from 'src/aplicacion/certificacion/comando/registrar-certificacion.manejador';
import { CertificacionDto } from 'src/aplicacion/certificacion/consulta/dto/certificacion.dto';
import { ManejadorListarCertificacion } from 'src/aplicacion/certificacion/consulta/listar-certificaciones.manejador';

@Controller('certificaciones')
export class CertificacionControlador {
  constructor(
    private readonly _manejadorRegistrarCertificacion: ManejadorRegistrarCertificacion,
    private readonly _manejadorEliminarCertificacion: ManejadorEliminarCertificacion,
    private readonly _manejadorListarCertificacion: ManejadorListarCertificacion
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crear(@Body() comandoCertificacion: ComandoCertificacion) {
    await this._manejadorRegistrarCertificacion.ejecutar(comandoCertificacion);
  }

  @Delete(':id')
  async eliminar(@Param('id') certificacionId: number) {
    await this._manejadorEliminarCertificacion.ejecutar(certificacionId);
  }

  @Get()
  async listar(): Promise<CertificacionDto[]> {
    return this._manejadorListarCertificacion.ejecutar();
  }
}
