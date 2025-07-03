import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { IsInt, IsPositive, IsDateString, IsString, IsOptional, IsNumber, IsIn } from 'class-validator';

@InputType()
export class CreateReservaInput {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  clienteId: number;

  @Field(() => Int)
  @IsInt()
  @IsPositive()
  vehiculoId: number;

  @Field()
  @IsDateString()
  fecha_inicio: string;

  @Field()
  @IsDateString()
  fecha_fin: string;

  @Field()
  @IsString()
  @IsIn(['pendiente', 'confirmada', 'cancelada', 'completada'])
  estado: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  precio_total: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  observaciones?: string;
}
