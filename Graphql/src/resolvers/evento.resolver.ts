import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { EventoService } from '../services/evento.service';
import { AsientoService } from '../services/asiento.service';
import { Evento } from '../entities/evento.entity';

@Resolver(() => Evento)
export class EventoResolver {
  constructor(
    private readonly eventoService: EventoService,
    private readonly asientoService: AsientoService,
  ) {}

  @Query(() => [Evento], { name: 'eventos' })
  async obtenerEventos(): Promise<Evento[]> {
    return this.eventoService.encontrarTodos();
  }

  @Query(() => Evento, { name: 'evento' })
  async obtenerEvento(@Args('id', { type: () => Int }) id: number): Promise<Evento> {
    return this.eventoService.encontrarPorId(id);
  }

  @Query(() => [Evento], { name: 'eventosDestacados' })
  async obtenerEventosDestacados(): Promise<Evento[]> {
    return this.eventoService.encontrarEventosDestacados();
  }

  @Query(() => [Evento], { name: 'buscarEventos' })
  async buscarEventos(
    @Args('query', { type: () => String }) query: string,
    @Args('ubicacion', { type: () => String, nullable: true }) ubicacion?: string,
  ): Promise<Evento[]> {
    return this.eventoService.buscarEventos(query, ubicacion);
  }
}
