import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
import { Vehiculo } from './entities/vehiculo.entity';

@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async create(dto: CreateVehiculoDto): Promise<Vehiculo> {
    const vehiculo = this.vehiculoRepository.create(dto);
    return await this.vehiculoRepository.save(vehiculo);
  }

  async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find();
  }

  async findAvailable(): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find({
      where: { estado: 'disponible' }
    });
  }

  async findOne(id: number): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.findOne({ 
      where: { id },
      relations: ['reservas']
    });
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con ID ${id} no encontrado`);
    }
    return vehiculo;
  }

  async update(id: number, dto: UpdateVehiculoDto): Promise<Vehiculo> {
    const vehiculo = await this.findOne(id);
    Object.assign(vehiculo, dto);
    return await this.vehiculoRepository.save(vehiculo);
  }

  async remove(id: number): Promise<void> {
    const vehiculo = await this.findOne(id);
    await this.vehiculoRepository.remove(vehiculo);
  }
}
