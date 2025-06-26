import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({ unique: true })
    email: string;

    @Column()
    telefono: string;

    @Column({ nullable: true })
    direccion: string;

    @Column({ nullable: true })
    documento_identidad: string;

    @OneToMany('Reserva', 'cliente')
    reservas: any[];
}
