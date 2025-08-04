import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Float, Int, registerEnumType } from '@nestjs/graphql';
import { Evento } from './evento.entity';
import { Entrada } from './entrada.entity';

export enum TipoEntradaEnum {
  GENERAL = 'GENERAL',
  VIP = 'VIP',
  PREMIUM = 'PREMIUM'
}

registerEnumType(TipoEntradaEnum, {
  name: 'TipoEntradaEnum',
});

@ObjectType()
@Entity('tipos_entrada')
export class TipoEntrada {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => TipoEntradaEnum)
  @Column({ 
    type: 'enum', 
    enum: TipoEntradaEnum,
    default: TipoEntradaEnum.GENERAL 
  })
  tipo: TipoEntradaEnum;

  @Field()
  @Column({ length: 100 })
  nombre: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Field(() => Float)
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Field(() => Int)
  @Column({ name: 'cantidad_disponible' })
  cantidadDisponible: number;

  @Field(() => Int)
  @Column({ name: 'cantidad_total' })
  cantidadTotal: number;

  @Field(() => Evento)
  @ManyToOne(() => Evento, evento => evento.tiposEntrada)
  @JoinColumn({ name: 'evento_id' })
  evento: Evento;

  @Field(() => [Entrada])
  @OneToMany(() => Entrada, entrada => entrada.tipoEntrada)
  entradas: Entrada[];
}
