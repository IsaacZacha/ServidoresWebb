import { IsEnum, IsNumber, IsOptional, IsObject, IsString, IsDateString } from 'class-validator';
import { MetodoPago, EstadoPago } from '../entities/pago.entity';

export class CreatePagoDto {
  @IsNumber()
  pedidoId: number;

  @IsEnum(MetodoPago)
  metodoPago: MetodoPago;

  @IsNumber()
  monto: number;

  @IsOptional()
  @IsObject()
  datosPago?: any;
}

export class UpdatePagoDto {
  @IsOptional()
  @IsEnum(EstadoPago)
  estado?: EstadoPago;

  @IsOptional()
  @IsString()
  referenciaExterna?: string;

  @IsOptional()
  @IsDateString()
  fechaProcesamiento?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
