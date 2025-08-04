import { IsString, IsEmail, IsOptional, IsDateString, Length } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @Length(2, 100)
  nombreCompleto: string;

  @IsEmail()
  @Length(5, 100)
  correoElectronico: string;

  @IsOptional()
  @IsString()
  @Length(10, 20)
  telefono?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;
}

export class UpdateUsuarioDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  nombreCompleto?: string;

  @IsOptional()
  @IsString()
  @Length(10, 20)
  telefono?: string;

  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;
}
