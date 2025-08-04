import { Resolver, Query, Args, Int, ObjectType, Field } from '@nestjs/graphql';
import { JsonDataService } from '../services/json-data.service';

@ObjectType()
export class TipoEntrada {
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

  @Field()
  beneficios: string;
}

@Resolver(() => TipoEntrada)
export class TipoEntradaResolver {
  constructor(
    private readonly jsonDataService: JsonDataService,
  ) {}

  @Query(() => [TipoEntrada], { name: 'tiposEntrada' })
  async obtenerTiposEntrada(): Promise<TipoEntrada[]> {
    return this.jsonDataService.findAll('tiposEntrada');
  }

  @Query(() => [TipoEntrada], { name: 'tiposEntradaPorEvento' })
  async obtenerTiposEntradaPorEvento(
    @Args('eventoId', { type: () => Int }) eventoId: number
  ): Promise<TipoEntrada[]> {
    return this.jsonDataService.findBy('tiposEntrada', { eventoId, activo: true });
  }

  @Query(() => TipoEntrada, { name: 'tipoEntrada' })
  async obtenerTipoEntrada(
    @Args('id', { type: () => Int }) id: number
  ): Promise<TipoEntrada> {
    return this.jsonDataService.findById('tiposEntrada', id);
  }
}
