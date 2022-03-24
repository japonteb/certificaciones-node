import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoExamen } from 'src/dominio/examen/puerto/dao/dao-examen';
import { ExamenDto } from 'src/aplicacion/examen/consulta/dto/examen.dto';

@Injectable()
export class DaoExamenMysql implements DaoExamen {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async listarPorClienteId(clienteId: number): Promise<ExamenDto[]> {
    return this.entityManager.query(
      `SELECT e.id, e.clienteId, e.certificacionId, e.fechaPresentacion, e.precioTotal  FROM EXAMEN e WHERE e.clienteId = ${clienteId}`
    );
  }
}
