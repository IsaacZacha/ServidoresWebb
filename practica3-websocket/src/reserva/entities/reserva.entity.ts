import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, cliente => cliente.reservas)
  cliente: Cliente;

  @ManyToOne(() => Vehiculo, vehiculo => vehiculo.reservas)
  vehiculo: Vehiculo;

  @Column('datetime')
  fecha_inicio: Date;

  @Column('datetime')
  fecha_fin: Date;

  @Column()
  estado: string;
}
