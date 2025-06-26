import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Vehiculo } from '../../vehiculo/entities/vehiculo.entity';


@Entity()
export class Reserva {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cliente, cliente => cliente.reservas)
    @JoinColumn({ name: 'cliente_id' })
    cliente: Cliente;

    @ManyToOne(() => Vehiculo, vehiculo => vehiculo.reservas)
    @JoinColumn({ name: 'vehiculo_id' })
    vehiculo: Vehiculo;

    @Column()
    fecha_inicio: Date;

    @Column()
    fecha_fin: Date;

    @Column({ default: 'pendiente' })
    estado: string; // pendiente, confirmada, cancelada, completada

    @Column('decimal', { precision: 10, scale: 2 })
    precio_total: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    fecha_creacion: Date;

    @Column({ nullable: true })
    observaciones: string;
}
