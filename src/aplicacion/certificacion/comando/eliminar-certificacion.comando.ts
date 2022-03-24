import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ComandoEliminarCertificacion {
  @IsNumber()
  @ApiProperty({ example: '1' })
  public id: number;
}
