import { Injectable } from '@nestjs/common';

import { DaoExamen } from 'src/dominio/examen/puerto/dao/dao-examen';
import { ExamenDto } from 'src/aplicacion/examen/consulta/dto/examen.dto';

@Injectable()
export class ManejadorListarExamenPorCliente {
  constructor(private _daoExamen: DaoExamen) {}

  async ejecutar(clienteId: number): Promise<ExamenDto[]> {
    return this._daoExamen.listarPorClienteId(clienteId);
  }
}
