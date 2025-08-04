import { IsString, IsDateString, IsNumber, IsOptional, IsBoolean, Length, Min } from 'class-validator';

export class CreateEventoDto {
  @IsString()
  @Length(2, 100)
  nombre: string;

  @IsString()
  descripcion: string;

  @IsDateString()
  fechaEvento: string;

  @IsString()
  horaInicio: string;

  @IsOptional()
  @IsString()
  horaFin?: string;

  @IsNumber()
  @Min(1)
  capacidadTotal: number;

  @IsOptional()
  @IsString()
  imagenUrl?: string;

  @IsNumber()
  ubicacionId: number;
}

export class UpdateEventoDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  nombre?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsDateString()
  fechaEvento?: string;

  @IsOptional()
  @IsString()
  horaInicio?: string;

  @IsOptional()
  @IsString()
  horaFin?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacidadTotal?: number;

  @IsOptional()
  @IsString()
  imagenUrl?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
