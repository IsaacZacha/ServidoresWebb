import { IsString, IsNumber, IsOptional, Length, Min, Max } from 'class-validator';

export class CreateUbicacionDto {
  @IsString()
  @Length(2, 100)
  nombre: string;

  @IsString()
  @Length(5, 200)
  direccion: string;

  @IsString()
  @Length(2, 50)
  ciudad: string;

  @IsString()
  @Length(2, 50)
  pais: string;

  @IsOptional()
  @IsString()
  @Length(3, 10)
  codigoPostal?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitud?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitud?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacidad?: number;
}

export class UpdateUbicacionDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  nombre?: string;

  @IsOptional()
  @IsString()
  @Length(5, 200)
  direccion?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  ciudad?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  pais?: string;

  @IsOptional()
  @IsString()
  @Length(3, 10)
  codigoPostal?: string;

  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitud?: number;

  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitud?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  capacidad?: number;
}
