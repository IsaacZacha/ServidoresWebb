import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Reserva } from "./Reserva";

@Entity()
export class Extensiones_reserva {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Reserva, reserva => reserva.extensiones)
  reserva!: Reserva;

  @Column()
  fecha_solicitud!: Date;

  @Column()
  nueva_fecha_devolucion!: Date;

  @Column()
  estado!: string; // "pendiente", "aprobada", "rechazada"

  @Column({ nullable: true })
  motivo?: string;
}
