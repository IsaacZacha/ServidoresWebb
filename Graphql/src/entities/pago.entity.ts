import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { Pedido } from './pedido.entity';

export enum MetodoPago {
  TARJETA_CREDITO = 'TARJETA_CREDITO',
  TARJETA_DEBITO = 'TARJETA_DEBITO',
  PAYPAL = 'PAYPAL',
  TRANSFERENCIA = 'TRANSFERENCIA'
}

export enum EstadoPago {
  PENDIENTE = 'PENDIENTE',
  PROCESANDO = 'PROCESANDO',
  COMPLETADO = 'COMPLETADO',
  FALLIDO = 'FALLIDO',
  REEMBOLSADO = 'REEMBOLSADO'
}

registerEnumType(MetodoPago, {
  name: 'MetodoPago',
});

registerEnumType(EstadoPago, {
  name: 'EstadoPago',
});

@ObjectType()
@Entity('pagos')
export class Pago {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => MetodoPago)
  @Column({ 
    name: 'metodo_pago',
    type: 'enum', 
    enum: MetodoPago 
  })
  metodoPago: MetodoPago;

  @Field(() => EstadoPago)
  @Column({ 
    type: 'enum', 
    enum: EstadoPago,
    default: EstadoPago.PENDIENTE 
  })
  estado: EstadoPago;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  monto: number;

  @Field({ nullable: true })
  @Column({ name: 'referencia_externa', nullable: true })
  referenciaExterna: string;

  @Field({ nullable: true })
  @Column({ name: 'datos_pago', type: 'json', nullable: true })
  datosPago: any;

  @Field({ nullable: true })
  @Column({ name: 'fecha_procesamiento', nullable: true })
  fechaProcesamiento: Date;

  @Field(() => Pedido)
  @OneToOne(() => Pedido, pedido => pedido.pago)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @Field()
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Field()
  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
