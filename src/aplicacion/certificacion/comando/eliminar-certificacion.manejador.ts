import { Injectable } from '@nestjs/common';
import { ServicioEliminarCertificacion } from 'src/dominio/certificacion/servicio/servicio-eliminar-certificacion';

@Injectable()
export class ManejadorEliminarCertificacion {
  constructor(
    private _servicioEliminarCertificacion: ServicioEliminarCertificacion
  ) {}

  async ejecutar(certificacionId: number) {
    await this._servicioEliminarCertificacion.ejecutar(certificacionId);
  }
}
