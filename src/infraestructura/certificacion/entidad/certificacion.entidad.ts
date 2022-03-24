import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'CERTIFICACION' })
export class CertificacionEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  detalle: string;

  @Column()
  duracion: number;

  @Column()
  precio: number;
}
