import { ApiProperty } from '@nestjs/swagger';
import { CertificacionEntidad } from 'src/infraestructura/certificacion/entidad/certificacion.entidad';

export class CertificacionDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Java' })
  nombre: string;

  @ApiProperty({ example: 'Java EE y Servicios Web' })
  detalle: string;

  @ApiProperty({ example: 120 })
  duracion: number;

  @ApiProperty({ example: 1000 })
  precio: number;

  constructor(
    id: number,
    nombre: string,
    detalle: string,
    duracion: number,
    precio: number
  ) {
    this.id = id;
    this.nombre = nombre;
    this.detalle = detalle;
    this.duracion = duracion;
    this.precio = precio;
  }
  static deCertificacionEntidad(
    certificacionEntidad: CertificacionEntidad
  ): CertificacionDto {
    return new CertificacionDto(
      certificacionEntidad.id,
      certificacionEntidad.nombre,
      certificacionEntidad.detalle,
      certificacionEntidad.duracion,
      certificacionEntidad.precio
    );
  }
}
