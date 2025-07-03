import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';

@ObjectType()
@Entity()
export class Reserva {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Cliente)
  @ManyToOne(() => Cliente, cliente => cliente.reservas)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Field(() => Vehiculo)
  @ManyToOne(() => Vehiculo, vehiculo => vehiculo.reservas)
  @JoinColumn({ name: 'vehiculo_id' })
  vehiculo: Vehiculo;

  @Field()
  @Column()
  fecha_inicio: Date;

  @Field()
  @Column()
  fecha_fin: Date;

  @Field()
  @Column({ default: 'pendiente' })
  estado: string; // pendiente, confirmada, cancelada, completada

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  precio_total: number;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  observaciones: string;
}
