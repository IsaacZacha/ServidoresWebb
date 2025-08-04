import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';
import { Evento } from './evento.entity';
import { TipoEntrada } from './tipo-entrada.entity';
import { Pedido } from './pedido.entity'

export enum EstadoEntrada {
  DISPONIBLE = 'DISPONIBLE',
  RESERVADA = 'RESERVADA',
  VENDIDA = 'VENDIDA',
  UTILIZADA = 'UTILIZADA'
}

registerEnumType(EstadoEntrada, {
  name: 'EstadoEntrada',
});

@ObjectType()
@Entity('entradas')
export class Entrada {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ name: 'numero_asiento', nullable: true })
  numeroAsiento: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  fila: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  seccion: string;

  @Field(() => EstadoEntrada)
  @Column({ 
    type: 'enum', 
    enum: EstadoEntrada,
    default: EstadoEntrada.DISPONIBLE 
  })
  estado: EstadoEntrada;

  @Field()
  @Column({ name: 'codigo_qr', unique: true })
  codigoQR: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Field(() => Evento)
  @ManyToOne(() => Evento, evento => evento.entradas)
  @JoinColumn({ name: 'evento_id' })
  evento: Evento;

  @Field(() => TipoEntrada)
  @ManyToOne(() => TipoEntrada, tipoEntrada => tipoEntrada.entradas)
  @JoinColumn({ name: 'tipo_entrada_id' })
  tipoEntrada: TipoEntrada;

  @Field(() => Pedido, { nullable: true })
  @ManyToOne(() => Pedido, pedido => pedido.entradas, { nullable: true })
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  @Field()
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Field()
  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
