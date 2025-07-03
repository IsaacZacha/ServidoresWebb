import { CreateVehiculoInput } from './create-vehiculo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsPositive } from 'class-validator';

@InputType()
export class UpdateVehiculoInput extends PartialType(CreateVehiculoInput) {
  @Field(() => Int)
  @IsInt()
  @IsPositive()
  id: number;
}
