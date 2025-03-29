import { Cliente } from "./Cliente";
import { Vehiculo } from "./Vehiculo";

export interface Reserva {
  id: number;
  cliente: Cliente;
  vehiculo: Vehiculo;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: string;
}