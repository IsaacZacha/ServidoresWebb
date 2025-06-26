export class CreateReservaDto {
    cliente_id: number;
    vehiculo_id: number;
    fecha_inicio: Date;
    fecha_fin: Date;
    observaciones?: string;
}
