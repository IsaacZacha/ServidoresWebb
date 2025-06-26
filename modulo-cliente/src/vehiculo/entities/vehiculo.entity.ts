import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Vehiculo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    marca: string;

    @Column()
    modelo: string;

    @Column({ unique: true })
    placa: string;

    @Column()
    tipo: string;

    @Column()
    año: number;

    @Column()
    color: string;

    @Column({ default: 'disponible' })
    estado: string; // disponible, reservado, mantenimiento

    @Column('decimal', { precision: 10, scale: 2 })
    precio_por_dia: number;

    @OneToMany('Reserva', 'vehiculo')
    reservas: any[];
}
