import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';
import { Examen } from 'src/dominio/examen/modelo/examen';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamenEntidad } from '../../entidad/examen.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositorioExamenMysql implements RepositorioExamen {
  constructor(
    @InjectRepository(ExamenEntidad)
    private readonly repositorio: Repository<ExamenEntidad>
  ) {}

  async existe(_clienteId: number, _certificacionId: number): Promise<boolean> {
    return (
      (await this.repositorio.count({
        where: {
          clienteId: _clienteId,
          certificacionId: _certificacionId,
        },
      })) > 0
    );
  }

  async existeCertificacionEnExamenesPorCertificacionId(
    certificacionId: number
  ): Promise<boolean> {
    return (await this.repositorio.countBy({ certificacionId })) > 0;
  }

  async guardar(examen: Examen) {
    const entidad = new ExamenEntidad();
    entidad.clienteId = examen.cliente.id;
    entidad.certificacionId = examen.certificacion.id;
    entidad.fechaPresentacion = examen.fechaPresentacion;
    entidad.precioTotal = examen.precioTotal;
    await this.repositorio.save(entidad);
  }
}
