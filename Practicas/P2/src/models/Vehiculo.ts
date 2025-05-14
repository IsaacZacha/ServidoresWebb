import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reserva } from "./Reserva";

@Entity()
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  marca!: string;

  @Column()
  modelo!: string;

  @Column()
  placa!: string;

  @Column()
  tipo!: string; // SUV, Sedan, etc.

  @OneToMany(() => Reserva, reserva => reserva.vehiculo)
  reservas!: Reserva[];
}
