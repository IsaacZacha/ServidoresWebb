import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Ubicacion } from './ubicacion.entity';
import { TipoEntrada } from './tipo-entrada.entity';
import { Entrada } from './entrada.entity';

@ObjectType()
@Entity('eventos')
export class Evento {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  nombre: string;

  @Field()
  @Column({ type: 'text' })
  descripcion: string;

  @Field()
  @Column({ name: 'fecha_evento' })
  fechaEvento: Date;

  @Field()
  @Column({ name: 'hora_inicio' })
  horaInicio: string;

  @Field({ nullable: true })
  @Column({ name: 'hora_fin', nullable: true })
  horaFin: string;

  @Field(() => Int)
  @Column({ name: 'capacidad_total' })
  capacidadTotal: number;

  @Field(() => Int)
  @Column({ name: 'entradas_disponibles' })
  entradasDisponibles: number;

  @Field({ nullable: true })
  @Column({ name: 'imagen_url', nullable: true })
  imagenUrl: string;

  @Field()
  @Column({ default: true })
  activo: boolean;

  @Field(() => Ubicacion)
  @ManyToOne(() => Ubicacion, ubicacion => ubicacion.eventos)
  @JoinColumn({ name: 'ubicacion_id' })
  ubicacion: Ubicacion;

  @Field(() => [TipoEntrada])
  @OneToMany(() => TipoEntrada, tipoEntrada => tipoEntrada.evento)
  tiposEntrada: TipoEntrada[];

  @Field(() => [Entrada])
  @OneToMany(() => Entrada, entrada => entrada.evento)
  entradas: Entrada[];

  @Field()
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Field()
  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
