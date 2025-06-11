import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { Cliente } from "./Cliente";
import { Vehiculo } from "./Vehiculo";
import { Extensiones_reserva } from "./Extenciones_reserva";
import { Cancelaciones } from "./Cancelaciones";
import { Calificaciones } from "./Calificaciones";
import { Incidentes } from "./Incidente";
import { Historial_estado } from "./Historial_estado";

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cliente, cliente => cliente.reservas)
  cliente!: Cliente;

  @ManyToOne(() => Vehiculo, vehiculo => vehiculo.reservas)
  vehiculo!: Vehiculo;

  @Column()
  fecha_inicio!: Date;

  @Column()
  fecha_fin!: Date;

  @Column()
  estado!: string; // pendiente, activa, finalizada, cancelada

  @Column("decimal", { precision: 10, scale: 2 })
  precio_total!: number;

  @OneToMany(() => Extensiones_reserva, ext => ext.reserva)
  extensiones!: Extensiones_reserva[];

  @OneToMany(() => Cancelaciones, cancelacion => cancelacion.reserva)
  cancelaciones!: Cancelaciones[];

  @OneToMany(() => Calificaciones, calificacion => calificacion.reserva)
  calificaciones!: Calificaciones[];

  @OneToMany(() => Incidentes, incidente => incidente.reserva)
  incidentes!: Incidentes[];

  @OneToMany(() => Historial_estado, historial => historial.reserva)
  historial_estado!: Historial_estado[];
}

