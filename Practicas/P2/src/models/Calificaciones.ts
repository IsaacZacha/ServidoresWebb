import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Reserva } from "./Reserva";
import { Cliente } from "./Cliente";

@Entity()
export class Calificaciones {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Reserva, reserva => reserva.calificaciones)
  reserva!: Reserva;

  @ManyToOne(() => Cliente, cliente => cliente.calificaciones)
  cliente!: Cliente;

  @Column()
  puntuacion!: number; // 1 a 5

  @Column({ nullable: true })
  comentario?: string | null;

  @Column()
  fecha!: Date;
}
