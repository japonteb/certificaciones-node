import { ApiProperty } from '@nestjs/swagger';

export class ExamenDto {
  @ApiProperty({ example: 'Java' })
  id: number;

  @ApiProperty({
    example: 'Java',
  })
  nombreCertificacion: string;

  @ApiProperty({
    example: 'Java EE y Servicios Web',
  })
  detalleCertificacion: string;

  @ApiProperty({ example: '2022-03-22 15:48:02' })
  fechaPresentacion: number;

  @ApiProperty({ example: 1000 })
  precioTotal: number;
}
