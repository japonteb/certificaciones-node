import { ApiProperty } from '@nestjs/swagger';
import { ClienteEntidad } from './../../../../infraestructura/cliente/entidad/cliente.entidad';

export class ClienteDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'William' })
  nombre: string;

  @ApiProperty({ example: 4 })
  tipoCliente: number;

  constructor(id: number, nombre: string, tipoCliente: number) {
    this.id = id;
    this.nombre = nombre;
    this.tipoCliente = tipoCliente;
  }
  static deClienteEntidad(clienteEntidad: ClienteEntidad): ClienteDto {
    return new ClienteDto(
      clienteEntidad.id,
      clienteEntidad.nombre,
      clienteEntidad.tipoCliente
    );
  }
}
