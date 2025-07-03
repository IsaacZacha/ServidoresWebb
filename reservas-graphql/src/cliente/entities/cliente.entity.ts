import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reserva } from '../../reserva/entities/reserva.entity';

@ObjectType()
@Entity()
export class Cliente {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;

  @Field()
  @Column()
  apellido: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  telefono: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  direccion: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  documento_identidad: string;

  @Field(() => [Reserva], { nullable: true })
  @OneToMany(() => Reserva, reserva => reserva.cliente)
  reservas: Reserva[];
}
