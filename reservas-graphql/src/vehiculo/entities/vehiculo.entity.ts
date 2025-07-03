import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from '../../reserva/entities/reserva.entity';

@ObjectType()
@Entity()
export class Vehiculo {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  marca: string;

  @Field()
  @Column()
  modelo: string;

  @Field()
  @Column({ unique: true })
  placa: string;

  @Field()
  @Column()
  tipo: string;

  @Field(() => Int)
  @Column()
  anio: number;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column({ default: 'disponible' })
  estado: string; // disponible, reservado, mantenimiento

  @Field(() => Float)
  @Column('decimal', { precision: 10, scale: 2 })
  precio_por_dia: number;

  @Field(() => [Reserva], { nullable: true })
  @OneToMany(() => Reserva, reserva => reserva.vehiculo)
  reservas: Reserva[];
}
