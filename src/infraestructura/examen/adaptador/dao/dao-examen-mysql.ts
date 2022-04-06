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
      `SELECT e.id, c.nombre, c.detalle, e.fechaPresentacion, e.precioTotal 
      FROM EXAMEN e 
      INNER JOIN certificacion c 
      ON 
      c.id = e.certificacionId 
      WHERE e.clienteId = ${clienteId}`
    );
  }
}
