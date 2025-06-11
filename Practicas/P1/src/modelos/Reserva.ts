import { Cliente } from "./Cliente";
import { Vehiculo } from "./Vehiculo";

export class Reserva {
    id: number = 0;
    cliente!: Cliente;
    vehiculo!: Vehiculo;
    fecha_inicio: string = "";
    fecha_fin: string = "";
}