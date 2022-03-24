import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { ComandoCertificacion } from 'src/aplicacion/certificacion/comando/certificacion.comando';
import { ComandoCliente } from 'src/aplicacion/cliente/comando/cliente.comando';

export class ComandoRegistrarExamen {
  @ApiProperty({ example: '1' })
  public id: number;

  @ApiProperty({ example: { id: 1, nombre: 'Juan Perez', tipoCliente: 4 } })
  public comandoCliente: ComandoCliente;

  @ApiProperty({
    example: {
      id: 1,
      nombre: 'Java',
      detalle: 'Java EE y Servicios Web',
      duracion: 120,
      precio: 1000,
    },
  })
  public comandoCertificacion: ComandoCertificacion;

  @IsDateString()
  @ApiProperty({ type: Date })
  public fechaPresentacion: string;

  @ApiProperty({ example: 1000 })
  public precioTotal: number;
}
