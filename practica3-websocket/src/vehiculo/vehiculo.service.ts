import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepo: Repository<Vehiculo>,
  ) {}

  async create(dto: CreateVehiculoDto): Promise<Vehiculo> {
    const nuevo = this.vehiculoRepo.create(dto);
    return await this.vehiculoRepo.save(nuevo);
  }

  async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculoRepo.find({ relations: ['reservas'] });
  }

  async findOne(id: number): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepo.findOne({ 
      where: { id }, 
      relations: ['reservas'] 
    });
    if (!vehiculo) {
      throw new NotFoundException(`Vehiculo con id ${id} no encontrado`);
    }
    return vehiculo;
  }

  async update(id: number, dto: UpdateVehiculoDto): Promise<Vehiculo> {
    const vehiculo = await this.findOne(id);
    const actualizado = Object.assign(vehiculo, dto);
    return await this.vehiculoRepo.save(actualizado);
  }

  async remove(id: number): Promise<void> {
    const vehiculo = await this.findOne(id);
    await this.vehiculoRepo.remove(vehiculo);
  }
}
