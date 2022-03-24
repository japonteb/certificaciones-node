import { ApiProperty } from '@nestjs/swagger';

export class ClienteDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'William' })
  nombre: string;

  @ApiProperty({ example: 4 })
  tipoCliente: number;
}
