import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'CLIENTE' })
export class ClienteEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipoCliente: number;
}
