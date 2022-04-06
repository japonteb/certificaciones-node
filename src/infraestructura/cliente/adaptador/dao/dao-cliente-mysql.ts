import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ClienteDto } from 'src/aplicacion/cliente/consulta/dto/cliente.dto';
import { DaoCliente } from 'src/dominio/cliente/puerto/dao/dao-cliente';
import { EntityManager } from 'typeorm';
import { ClienteEntidad } from './../../entidad/cliente.entidad';

@Injectable()
export class DaoClienteMysql implements DaoCliente {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async listar(): Promise<ClienteDto[]> {
    return this.entityManager.query(
      'SELECT c.id, c.nombre, c.tipoCliente FROM CLIENTE c'
    );
  }

  async obtenerCliente(clienteId: number): Promise<ClienteDto> {
    const clienteEntidad: ClienteEntidad = await this.entityManager.findOneBy(
      ClienteEntidad,
      {
        id: clienteId,
      }
    );
    return ClienteDto.deClienteEntidad(clienteEntidad);
  }
}
