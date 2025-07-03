import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehiculoInput } from './dto/create-vehiculo.input';
import { UpdateVehiculoInput } from './dto/update-vehiculo.input';
import { Vehiculo } from './entities/vehiculo.entity';

@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async create(createVehiculoInput: CreateVehiculoInput): Promise<Vehiculo> {
    const vehiculo = this.vehiculoRepository.create(createVehiculoInput);
    return await this.vehiculoRepository.save(vehiculo);
  }

  async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find({
      relations: ['reservas'],
    });
  }

  async findOne(id: number): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.findOne({
      where: { id },
      relations: ['reservas'],
    });
    
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }
    
    return vehiculo;
  }

  async update(id: number, updateVehiculoInput: UpdateVehiculoInput): Promise<Vehiculo> {
    const vehiculo = await this.findOne(id);
    Object.assign(vehiculo, updateVehiculoInput);
    return await this.vehiculoRepository.save(vehiculo);
  }

  async remove(id: number): Promise<Vehiculo> {
    const vehiculo = await this.findOne(id);
    await this.vehiculoRepository.remove(vehiculo);
    return vehiculo;
  }

  async findAvailable(): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find({
      where: { estado: 'disponible' },
      relations: ['reservas'],
    });
  }
}
