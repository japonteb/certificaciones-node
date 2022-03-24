import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Certificacion } from 'src/dominio/certificacion/modelo/certificacion';
import { RepositorioCertificacion } from 'src/dominio/certificacion/puerto/repositorio/repositorio-certificacion';
import { Repository } from 'typeorm';
import { CertificacionEntidad } from '../../entidad/certificacion.entidad';

@Injectable()
export class RepositorioCertificacionMysql implements RepositorioCertificacion {
  constructor(
    @InjectRepository(CertificacionEntidad)
    private readonly repositorio: Repository<CertificacionEntidad>
  ) {}

  async guardar(certificacion: Certificacion) {
    const entidad = new CertificacionEntidad();
    entidad.nombre = certificacion.nombre;
    entidad.detalle = certificacion.detalle;
    entidad.duracion = certificacion.duracion;
    entidad.precio = certificacion.precio;
    await this.repositorio.save(entidad);
  }

  async eliminar(certificacionId: number) {
    await this.repositorio.delete(certificacionId);
  }

  async existePorNombreYDetalle(
    _nombre: string,
    _detalle: string
  ): Promise<boolean> {
    return (
      (await this.repositorio.count({
        where: {
          nombre: _nombre,
          detalle: _detalle,
        },
      })) > 0
    );
  }

  async existePorId(id: number): Promise<boolean> {
    return (await this.repositorio.countBy({ id })) > 0;
  }
}
