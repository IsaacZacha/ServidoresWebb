import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepo: Repository<Reserva>,
  ) {}

  async create(dto: CreateReservaDto): Promise<Reserva> {
    const nuevo = this.reservaRepo.create(dto);
    return await this.reservaRepo.save(nuevo);
  }

  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepo.find({ 
      relations: ['cliente', 'vehiculo'] 
    });
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepo.findOne({ 
      where: { id }, 
      relations: ['cliente', 'vehiculo'] 
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }
    return reserva;
  }

  async update(id: number, dto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.findOne(id);
    const actualizado = Object.assign(reserva, dto);
    return await this.reservaRepo.save(actualizado);
  }

  async remove(id: number): Promise<void> {
    const reserva = await this.findOne(id);
    await this.reservaRepo.remove(reserva);
  }
}
