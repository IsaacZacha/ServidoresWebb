import { IsString, IsNumber, IsOptional, IsArray, Length, Min, IsEnum, IsDateString } from 'class-validator';
import { EstadoPedido } from '../entities/pedido.entity';

export class CreatePedidoDto {
  @IsNumber()
  usuarioId: number;

  @IsArray()
  @IsNumber({}, { each: true })
  entradaIds: number[];
}

export class CreatePedidoConEntradasDto {
  @IsNumber()
  usuarioId: number;

  @IsArray()
  entradas: CreateEntradaPedidoDto[];
}

export class CreateEntradaPedidoDto {
  @IsNumber()
  eventoId: number;

  @IsNumber()
  tipoEntradaId: number;

  @IsNumber()
  @Min(1)
  cantidad: number;

  @IsOptional()
  @IsString()
  numeroAsiento?: string;

  @IsOptional()
  @IsString()
  fila?: string;

  @IsOptional()
  @IsString()
  seccion?: string;
}

export class UpdatePedidoDto {
  @IsOptional()
  @IsEnum(EstadoPedido)
  estado?: EstadoPedido;

  @IsOptional()
  @IsNumber()
  subtotal?: number;

  @IsOptional()
  @IsNumber()
  tarifaServicio?: number;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsDateString()
  fechaExpiracion?: string;
}
