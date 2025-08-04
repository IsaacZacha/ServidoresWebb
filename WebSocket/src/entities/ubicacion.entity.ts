import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { Evento } from './evento.entity';

@ObjectType()
@Entity('ubicaciones')
export class Ubicacion {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  nombre: string;

  @Field()
  @Column({ length: 200 })
  direccion: string;

  @Field()
  @Column({ length: 50 })
  ciudad: string;

  @Field()
  @Column({ length: 50 })
  pais: string;

  @Field({ nullable: true })
  @Column({ name: 'codigo_postal', length: 10, nullable: true })
  codigoPostal: string;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitud: number;

  @Field(() => Float, { nullable: true })
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitud: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  capacidad: number;

  @Field(() => [Evento])
  @OneToMany(() => Evento, evento => evento.ubicacion)
  eventos: Evento[];

  @Field()
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Field()
  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
