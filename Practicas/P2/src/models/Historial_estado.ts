import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Reserva } from "./Reserva";

@Entity()
export class Historial_estado {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Reserva, reserva => reserva.historial_estado)
  reserva!: Reserva;

  @Column()
  estado!: string; // pendiente, activa, finalizada, cancelada

  @Column()
  fecha_cambio!: Date;

  @Column()
  cambiado_por!: string;

  @Column({ nullable: true })
  observaciones?: string;
}
