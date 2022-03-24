import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DaoCertificacion } from 'src/dominio/certificacion/puerto/dao/dao-certificacion';
import { CertificacionDto } from 'src/aplicacion/certificacion/consulta/dto/certificacion.dto';

@Injectable()
export class DaoCertificacionMysql implements DaoCertificacion {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager
  ) {}

  async listar(): Promise<CertificacionDto[]> {
    return this.entityManager.query(
      'SELECT c.id, c.nombre, c.detalle, c.duracion, c.precio FROM CERTIFICACION c'
    );
  }
}
