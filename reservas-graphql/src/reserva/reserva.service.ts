import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservaInput } from './dto/create-reserva.input';
import { UpdateReservaInput } from './dto/update-reserva.input';
import { Reserva } from './entities/reserva.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Vehiculo } from '../vehiculo/entities/vehiculo.entity';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Vehiculo)
    private vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async create(createReservaInput: CreateReservaInput): Promise<Reserva> {
    const { clienteId, vehiculoId, ...reservaData } = createReservaInput;

    // Verificar que el cliente existe
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
    }

    // Verificar que el vehículo existe y está disponible
    const vehiculo = await this.vehiculoRepository.findOne({ where: { id: vehiculoId } });
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con ID ${vehiculoId} no encontrado`);
    }

    if (vehiculo.estado !== 'disponible') {
      throw new BadRequestException(`El vehículo no está disponible para reserva`);
    }

    const reserva = this.reservaRepository.create({
      ...reservaData,
      cliente,
      vehiculo,
      fecha_inicio: new Date(reservaData.fecha_inicio),
      fecha_fin: new Date(reservaData.fecha_fin),
    });

    // Cambiar estado del vehículo a reservado
    vehiculo.estado = 'reservado';
    await this.vehiculoRepository.save(vehiculo);

    return await this.reservaRepository.save(reserva);
  }

  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      relations: ['cliente', 'vehiculo'],
    });
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['cliente', 'vehiculo'],
    });
    
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }
    
    return reserva;
  }

  async update(id: number, updateReservaInput: UpdateReservaInput): Promise<Reserva> {
    const reserva = await this.findOne(id);
    const { clienteId, vehiculoId, ...updateData } = updateReservaInput;

    if (clienteId && clienteId !== reserva.cliente.id) {
      const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
      if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${clienteId} no encontrado`);
      }
      reserva.cliente = cliente;
    }

    if (vehiculoId && vehiculoId !== reserva.vehiculo.id) {
      const vehiculo = await this.vehiculoRepository.findOne({ where: { id: vehiculoId } });
      if (!vehiculo) {
        throw new NotFoundException(`Vehículo con ID ${vehiculoId} no encontrado`);
      }
      reserva.vehiculo = vehiculo;
    }

    if (updateData.fecha_inicio) {
      reserva.fecha_inicio = new Date(updateData.fecha_inicio);
      delete updateData.fecha_inicio;
    }
    if (updateData.fecha_fin) {
      reserva.fecha_fin = new Date(updateData.fecha_fin);
      delete updateData.fecha_fin;
    }

    Object.assign(reserva, updateData);
    return await this.reservaRepository.save(reserva);
  }

  async remove(id: number): Promise<Reserva> {
    const reserva = await this.findOne(id);
    
    // Liberar el vehículo
    reserva.vehiculo.estado = 'disponible';
    await this.vehiculoRepository.save(reserva.vehiculo);
    
    await this.reservaRepository.remove(reserva);
    return reserva;
  }
}
