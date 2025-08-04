import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { Usuario } from './usuario.entity';
import { Entrada } from './entrada.entity';
import { Pago } from './pago.entity';

export enum EstadoPedido {
  PENDIENTE = 'PENDIENTE',
  CONFIRMADO = 'CONFIRMADO',
  PAGADO = 'PAGADO',
  CANCELADO = 'CANCELADO',
  COMPLETADO = 'COMPLETADO'
}

registerEnumType(EstadoPedido, {
  name: 'EstadoPedido',
});

@ObjectType()
@Entity('pedidos')
export class Pedido {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'numero_pedido', unique: true })
  numeroPedido: string;

  @Field(() => EstadoPedido)
  @Column({ 
    type: 'enum', 
    enum: EstadoPedido,
    default: EstadoPedido.PENDIENTE 
  })
  estado: EstadoPedido;

  @Field(() => Float)
  @Column({ name: 'subtotal', type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @Field(() => Float)
  @Column({ name: 'tarifa_servicio', type: 'decimal', precision: 10, scale: 2, default: 0 })
  tarifaServicio: number;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Field({ nullable: true })
  @Column({ name: 'fecha_expiracion', nullable: true })
  fechaExpiracion: Date;

  @Field(() => Usuario)
  @ManyToOne(() => Usuario, usuario => usuario.pedidos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Field(() => [Entrada])
  @OneToMany(() => Entrada, entrada => entrada.pedido)
  entradas: Entrada[];

  @Field(() => Pago, { nullable: true })
  @OneToOne(() => Pago, pago => pago.pedido)
  pago: Pago;

  @Field()
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Field()
  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
