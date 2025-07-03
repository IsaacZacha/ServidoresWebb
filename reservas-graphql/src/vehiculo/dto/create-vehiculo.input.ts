import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, IsPositive, IsNumber, Min, IsIn } from 'class-validator';

@InputType()
export class CreateVehiculoInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  marca: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  modelo: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  placa: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  tipo: string;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  @Min(1900)
  anio: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  color: string;

  @Field()
  @IsString()
  @IsIn(['disponible', 'reservado', 'mantenimiento'])
  estado: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  precio_por_dia: number;
}
