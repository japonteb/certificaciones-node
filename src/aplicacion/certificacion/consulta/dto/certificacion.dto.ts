import { ApiProperty } from '@nestjs/swagger';

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
}
