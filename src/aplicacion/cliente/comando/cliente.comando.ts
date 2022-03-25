import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ComandoCliente {
  @IsNumber()
  @ApiProperty({ example: 1 })
  public id: number;

  @IsString()
  @ApiProperty({ example: 'Java' })
  public nombre: string;

  @IsNumber()
  @ApiProperty({ example: 4 })
  public tipoCliente: number;

  constructor(id: number, nombre: string, tipoCliente: number) {
    this.id = id;
    this.nombre = nombre;
    this.tipoCliente = tipoCliente;
  }
}
