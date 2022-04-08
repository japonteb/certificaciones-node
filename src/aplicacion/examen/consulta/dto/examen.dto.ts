import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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
  @Type(() => Date)
  fechaPresentacion: Date;

  @ApiProperty({ example: 1000 })
  precioTotal: number;
}
