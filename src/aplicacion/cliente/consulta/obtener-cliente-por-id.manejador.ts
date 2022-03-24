import { Injectable } from '@nestjs/common';

import { DaoCliente } from 'src/dominio/cliente/puerto/dao/dao-cliente';
import { ClienteDto } from 'src/aplicacion/cliente/consulta/dto/cliente.dto';

@Injectable()
export class ManejadorObtenerClientePorId {
  constructor(private _daoCliente: DaoCliente) {}

  async ejecutar(clienteId: number): Promise<ClienteDto> {
    return this._daoCliente.obtenerCliente(clienteId);
  }
}
