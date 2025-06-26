import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Reserva } from "./Reserva";

@Entity()
export class Incidentes {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Reserva, reserva => reserva.incidentes)
  reserva!: Reserva;

  @Column()
  fecha_incidente!: Date;

  @Column()
  descripcion!: string;

  @Column()
  tipo!: string; // accidente, daño, retraso, etc.

  @Column()
  responsable!: string; // cliente, empresa, otro

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  costo_estimado?: number;

  @Column({ default: false })
  resuelto!: boolean;
}
