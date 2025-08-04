import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Pedido } from './pedido.entity'

@ObjectType()
@Entity('usuarios')
export class Usuario {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'nombre_completo', length: 100 })
  nombreCompleto: string;

  @Field()
  @Column({ name: 'correo_electronico', length: 100, unique: true })
  correoElectronico: string;

  @Field({ nullable: true })
  @Column({ length: 20, nullable: true })
  telefono: string;

  @Field({ nullable: true })
  @Column({ name: 'fecha_nacimiento', nullable: true })
  fechaNacimiento: Date;

  @Field(() => [Pedido])
  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];

  @Field()
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Field()
  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
