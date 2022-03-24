import { IsInt, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoCertificacion {
  @ApiProperty({ example: 1 })
  public id: number;

  @IsString()
  @ApiProperty({ example: 'Java' })
  public nombre: string;

  @IsString()
  @ApiProperty({ example: 'Java EE y Servicios Web' })
  public detalle: string;

  @IsInt()
  @Min(0, { message: 'La duración debe ser mayor a cero' })
  @ApiProperty({ example: 120 })
  public duracion: number;

  @IsNumber()
  @Min(0, { message: 'El precio debe ser mayor a cero' })
  @ApiProperty({ example: 1000 })
  public precio: number;
}
