import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoCliente } from 'src/dominio/cliente/puerto/dao/dao-cliente';
import { ClienteDto } from 'src/aplicacion/cliente/consulta/dto/cliente.dto';

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
    return this.entityManager.query(
      `SELECT c.id, c.nombre, c.tipoCliente FROM CLIENTE c WHERE c.id = ${clienteId}`
    );
  }
}
