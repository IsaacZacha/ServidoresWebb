import { Resolver, Query, Args, Int, Mutation, ObjectType, Field } from '@nestjs/graphql';
import { AsientoService } from '../services/asiento.service';

@ObjectType()
export class AsientoGraphQL {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  eventoId: number;

  @Field()
  seccion: string;

  @Field()
  fila: string;

  @Field(() => Int)
  numero: number;

  @Field()
  ocupado: boolean;

  @Field()
  tipoAsiento: string;

  @Field(() => Int)
  precio: number;

  @Field(() => Int)
  posicionX: number;

  @Field(() => Int)
  posicionY: number;
}

@ObjectType()
export class SeccionAsientosGraphQL {
  @Field()
  nombre: string;

  @Field(() => [AsientoGraphQL])
  asientos: AsientoGraphQL[];

  @Field(() => Int)
  totalAsientos: number;

  @Field(() => Int)
  asientosDisponibles: number;
}

@ObjectType()
export class TipoEntradaGraphQL {
  @Field(() => Int)
  id: number;

  @Field()
  nombre: string;

  @Field()
  descripcion: string;

  @Field(() => Int)
  precio: number;

  @Field(() => Int)
  eventoId: number;

  @Field()
  activo: boolean;
}

@ObjectType()
export class ReservaResponse {
  @Field()
  exito: boolean;

  @Field()
  mensaje: string;

  @Field(() => [Int])
  asientosReservados: number[];
}

@Resolver()
export class AsientoResolver {
  constructor(
    private readonly asientoService: AsientoService,
  ) {}

  @Query(() => [SeccionAsientosGraphQL], { name: 'asientosPorEvento' })
  async obtenerAsientosPorEvento(
    @Args('eventoId', { type: () => Int }) eventoId: number
  ): Promise<SeccionAsientosGraphQL[]> {
    return this.asientoService.obtenerAsientosPorEvento(eventoId);
  }

  @Query(() => [TipoEntradaGraphQL], { name: 'tiposEntradaPorEvento' })
  async obtenerTiposEntradaPorEvento(
    @Args('eventoId', { type: () => Int }) eventoId: number
  ): Promise<TipoEntradaGraphQL[]> {
    return this.asientoService.obtenerTiposEntradaPorEvento(eventoId);
  }

  @Mutation(() => ReservaResponse, { name: 'reservarAsientos' })
  async reservarAsientos(
    @Args('eventoId', { type: () => Int }) eventoId: number,
    @Args('asientosIds', { type: () => [Int] }) asientosIds: number[],
    @Args('usuarioId', { type: () => Int }) usuarioId: number,
  ): Promise<ReservaResponse> {
    try {
      const exito = await this.asientoService.reservarAsientos(eventoId, asientosIds, usuarioId);
      
      return {
        exito,
        mensaje: exito ? 'Asientos reservados exitosamente' : 'Error al reservar asientos',
        asientosReservados: exito ? asientosIds : []
      };
    } catch (error) {
      return {
        exito: false,
        mensaje: error.message || 'Error interno del servidor',
        asientosReservados: []
      };
    }
  }
}
