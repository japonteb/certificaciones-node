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
}
