import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateClienteInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  nombre: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  apellido: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  telefono: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  direccion?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  documento_identidad?: string;
}
