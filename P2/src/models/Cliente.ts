import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Reserva } from "./Reserva";
import { Calificaciones } from "./Calificaciones";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  correo!: string;

  @OneToMany(() => Reserva, reserva => reserva.cliente)
  reservas!: Reserva[];

  @OneToMany(() => Calificaciones, calificacion => calificacion.cliente)
  calificaciones!: Calificaciones[];
}
