import { Resolver, Query, Args, Int, Mutation, ObjectType, Field, InputType } from '@nestjs/graphql';
import { PedidoService } from '../services/pedido.service';

@InputType()
export class CreatePedidoInput {
  @Field(() => Int)
  usuarioId: number;

  @Field(() => [CreateEntradaPedidoInput])
  entradas: CreateEntradaPedidoInput[];
}

@InputType()
export class CreateEntradaPedidoInput {
  @Field(() => Int)
  eventoId: number;

  @Field(() => Int)
  tipoEntradaId: number;

  @Field(() => Int)
  cantidad: number;

  @Field(() => [Int], { nullable: true })
  asientosSeleccionados?: number[];
}

@ObjectType()
export class PedidoResponse {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  usuarioId: number;

  @Field()
  estado: string;

  @Field(() => Int)
  total: number;

  @Field()
  fechaCreacion: Date;

  @Field(() => [EntradaResponse])
  entradas: EntradaResponse[];
}

@ObjectType()
export class EntradaResponse {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  eventoId: number;

  @Field()
  nombreEvento: string;

  @Field(() => Int)
  tipoEntradaId: number;

  @Field()
  tipoEntradaNombre: string;

  @Field(() => Int)
  cantidad: number;

  @Field(() => Int)
  precio: number;

  @Field(() => [Int], { nullable: true })
  asientosAsignados?: number[];
}

@Resolver()
export class PedidoResolver {
  constructor(
    private readonly pedidoService: PedidoService,
  ) {}

  @Mutation(() => PedidoResponse, { name: 'crearPedido' })
  async crearPedido(
    @Args('createPedidoInput') createPedidoInput: CreatePedidoInput
  ): Promise<any> {
    // Convertir input a DTO
    const createPedidoDto = {
      usuarioId: createPedidoInput.usuarioId,
      entradas: createPedidoInput.entradas.map(entrada => ({
        eventoId: entrada.eventoId,
        tipoEntradaId: entrada.tipoEntradaId,
        cantidad: entrada.cantidad
      }))
    };

    const pedido = await this.pedidoService.crear(createPedidoDto);
    
    // Transformar respuesta para GraphQL
    return {
      id: pedido.id,
      usuarioId: pedido.usuario?.id || 0,
      estado: pedido.estado,
      total: pedido.total,
      fechaCreacion: pedido.fechaCreacion,
      entradas: pedido.entradas?.map((entrada, index) => ({
        id: entrada.id,
        eventoId: entrada.evento?.id || 0,
        nombreEvento: entrada.evento?.nombre || 'Evento',
        tipoEntradaId: entrada.tipoEntrada?.id || 0,
        tipoEntradaNombre: entrada.tipoEntrada?.nombre || 'Entrada',
        cantidad: createPedidoInput.entradas[index]?.cantidad || 1,
        precio: 50000,
        asientosAsignados: createPedidoInput.entradas[index]?.asientosSeleccionados || []
      })) || []
    };
  }

  @Query(() => [PedidoResponse], { name: 'pedidosPorUsuario' })
  async obtenerPedidosPorUsuario(
    @Args('usuarioId', { type: () => Int }) usuarioId: number
  ): Promise<any[]> {
    const pedidos = await this.pedidoService.encontrarPorUsuario(usuarioId);
    
    return pedidos.map(pedido => ({
      id: pedido.id,
      usuarioId: pedido.usuario?.id || 0,
      estado: pedido.estado,
      total: pedido.total,
      fechaCreacion: pedido.fechaCreacion,
      entradas: []
    }));
  }

  @Query(() => PedidoResponse, { name: 'pedido' })
  async obtenerPedido(
    @Args('id', { type: () => Int }) id: number
  ): Promise<any> {
    const pedido = await this.pedidoService.encontrarPorId(id);
    
    return {
      id: pedido.id,
      usuarioId: pedido.usuario?.id || 0,
      estado: pedido.estado,
      total: pedido.total,
      fechaCreacion: pedido.fechaCreacion,
      entradas: []
    };
  }
}
