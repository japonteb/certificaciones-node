import { CertificacionDto } from 'src/aplicacion/certificacion/consulta/dto/certificacion.dto';
import { ClienteDto } from 'src/aplicacion/cliente/consulta/dto/cliente.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ExamenDto {
  @ApiProperty({ example: 'Java' })
  id: number;

  @ApiProperty({ example: { id: 1, nombre: 'Juan Perez', tipoCliente: 4 } })
  clienteDto: ClienteDto;

  @ApiProperty({
    example: {
      id: 1,
      nombre: 'Java',
      detalle: 'Java EE y Servicios Web',
      duracion: 120,
      precio: 1000,
    },
  })
  certificacionDto: CertificacionDto;

  @ApiProperty({ example: '2022-03-22 15:48:02' })
  fechaPresentacion: number;

  @ApiProperty({ example: 1000 })
  precioTotal: number;
}
