import { Injectable } from '@nestjs/common';

import { DaoCertificacion } from 'src/dominio/certificacion/puerto/dao/dao-certificacion';
import { CertificacionDto } from 'src/aplicacion/certificacion/consulta/dto/certificacion.dto';

@Injectable()
export class ManejadorListarCertificacion {
  constructor(private _daoCertificacion: DaoCertificacion) {}

  async ejecutar(): Promise<CertificacionDto[]> {
    return this._daoCertificacion.listar();
  }
}
