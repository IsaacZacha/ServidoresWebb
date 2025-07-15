import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from '../../reserva/entities/reserva.entity';

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  marca: string;

  @Column()
  modelo: string;

  @Column()
  placa: string;

  @Column()
  tipo: string;

  @OneToMany(() => Reserva, reserva => reserva.vehiculo)
  reservas: Reserva[];
}
