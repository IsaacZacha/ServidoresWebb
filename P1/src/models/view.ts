import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from "typeorm";
import { user } from "./user";

@Entity()
export class view{
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    vista!: string;
    @ManyToOne (() => user, (user: user) => user)
    user!: user;
}   