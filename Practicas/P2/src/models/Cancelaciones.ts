import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Reserva } from "./Reserva";

@Entity()
export class Cancelaciones {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Reserva, reserva => reserva.cancelaciones)
  reserva!: Reserva;

  @Column()
  fecha_cancelacion!: Date;

  @Column()
  motivo!: string;

  @Column()
  tipo_cancelacion!: string; // "cliente" o "empresa"

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  cargo_cancelacion!: number;
}
