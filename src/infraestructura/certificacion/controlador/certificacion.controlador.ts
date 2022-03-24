import { ErrorDuplicidad } from './../../../dominio/errores/error-duplicidad';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { ErrorIntegridadDatos } from 'src/dominio/errores/error-integridad-datos';

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
    try {
      await this._manejadorRegistrarCertificacion.ejecutar(
        comandoCertificacion
      );
    } catch (error) {
      if (error instanceof ErrorDuplicidad) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            name: error.name,
            message: error.message,
          },
          HttpStatus.FORBIDDEN
        );
      }
    }
  }

  @Delete(':id')
  async eliminar(@Param('id') certificacionId: number) {
    try {
      await this._manejadorEliminarCertificacion.ejecutar(certificacionId);
    } catch (error) {
      if (error instanceof ErrorIntegridadDatos) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            name: error.name,
            message: error.message,
          },
          HttpStatus.FORBIDDEN
        );
      }
    }
  }

  @Get()
  async listar(): Promise<CertificacionDto[]> {
    return this._manejadorListarCertificacion.ejecutar();
  }
}
