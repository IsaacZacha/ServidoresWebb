import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { view } from "./view";




@Entity()
export class user{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    nombre!: string;
    @Column()
    correo!: string;
    @OneToOne (() => view, (view: view) => view.user )
    vistas!: view[];
}