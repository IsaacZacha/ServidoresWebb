import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservaService } from './reserva.service';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaInput } from './dto/create-reserva.input';
import { UpdateReservaInput } from './dto/update-reserva.input';

@Resolver(() => Reserva)
export class ReservaResolver {
  constructor(private readonly reservaService: ReservaService) {}

  @Mutation(() => Reserva, { description: 'Crear una nueva reserva' })
  createReserva(@Args('createReservaInput') createReservaInput: CreateReservaInput): Promise<Reserva> {
    return this.reservaService.create(createReservaInput);
  }

  @Query(() => [Reserva], { name: 'reservas', description: 'Obtener todas las reservas' })
  findAll(): Promise<Reserva[]> {
    return this.reservaService.findAll();
  }

  @Query(() => Reserva, { name: 'reserva', description: 'Obtener una reserva por ID' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Reserva> {
    return this.reservaService.findOne(id);
  }

  @Mutation(() => Reserva, { description: 'Actualizar una reserva' })
  updateReserva(@Args('updateReservaInput') updateReservaInput: UpdateReservaInput): Promise<Reserva> {
    return this.reservaService.update(updateReservaInput.id, updateReservaInput);
  }

  @Mutation(() => Reserva, { description: 'Eliminar una reserva' })
  removeReserva(@Args('id', { type: () => Int }) id: number): Promise<Reserva> {
    return this.reservaService.remove(id);
  }
}
