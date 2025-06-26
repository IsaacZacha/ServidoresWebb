export class CreateVehiculoDto {
    marca: string;
    modelo: string;
    placa: string;
    tipo: string;
    año: number;
    color: string;
    precio_por_dia: number;
    estado?: string;
}
