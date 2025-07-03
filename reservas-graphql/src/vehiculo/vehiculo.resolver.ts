import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './entities/vehiculo.entity';
import { CreateVehiculoInput } from './dto/create-vehiculo.input';
import { UpdateVehiculoInput } from './dto/update-vehiculo.input';

@Resolver(() => Vehiculo)
export class VehiculoResolver {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Mutation(() => Vehiculo, { description: 'Crear un nuevo vehículo' })
  createVehiculo(@Args('createVehiculoInput') createVehiculoInput: CreateVehiculoInput): Promise<Vehiculo> {
    return this.vehiculoService.create(createVehiculoInput);
  }

  @Query(() => [Vehiculo], { name: 'vehiculos', description: 'Obtener todos los vehículos' })
  findAll(): Promise<Vehiculo[]> {
    return this.vehiculoService.findAll();
  }

  @Query(() => [Vehiculo], { name: 'vehiculosDisponibles', description: 'Obtener vehículos disponibles' })
  findAvailable(): Promise<Vehiculo[]> {
    return this.vehiculoService.findAvailable();
  }

  @Query(() => Vehiculo, { name: 'vehiculo', description: 'Obtener un vehículo por ID' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Vehiculo> {
    return this.vehiculoService.findOne(id);
  }

  @Mutation(() => Vehiculo, { description: 'Actualizar un vehículo' })
  updateVehiculo(@Args('updateVehiculoInput') updateVehiculoInput: UpdateVehiculoInput): Promise<Vehiculo> {
    return this.vehiculoService.update(updateVehiculoInput.id, updateVehiculoInput);
  }

  @Mutation(() => Vehiculo, { description: 'Eliminar un vehículo' })
  removeVehiculo(@Args('id', { type: () => Int }) id: number): Promise<Vehiculo> {
    return this.vehiculoService.remove(id);
  }
}
