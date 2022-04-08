import { Injectable } from '@nestjs/common';
import { ServicioRegistrarCertificacion } from 'src/dominio/certificacion/servicio/servicio-registrar-certificacion';
import { ComandoCertificacion } from './certificacion.comando';
import { Certificacion } from 'src/dominio/certificacion/modelo/certificacion';
import { CertificacionDto } from './../consulta/dto/certificacion.dto';

@Injectable()
export class ManejadorRegistrarCertificacion {
  constructor(
    private _servicioRegistrarCertificacion: ServicioRegistrarCertificacion
  ) {}

  async ejecutar(
    comandoCertificacion: ComandoCertificacion
  ): Promise<CertificacionDto> {
    return this._servicioRegistrarCertificacion.ejecutar(
      new Certificacion(
        comandoCertificacion.id,
        comandoCertificacion.nombre,
        comandoCertificacion.detalle,
        comandoCertificacion.duracion,
        comandoCertificacion.precio
      )
    );
  }
}
