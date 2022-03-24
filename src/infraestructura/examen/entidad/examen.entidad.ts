import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'EXAMEN' })
export class ExamenEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clienteId: number;

  @Column()
  certificacionId: number;

  @Column()
  fechaPresentacion: Date;

  @Column()
  precioTotal: number;
}
