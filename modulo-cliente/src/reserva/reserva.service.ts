import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
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

  async create(dto: CreateReservaDto): Promise<Reserva> {
    // Validar que el cliente existe
    const cliente = await this.clienteRepository.findOne({ where: { id: dto.cliente_id } });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${dto.cliente_id} no encontrado`);
    }

    // Validar que el vehículo existe y está disponible
    const vehiculo = await this.vehiculoRepository.findOne({ where: { id: dto.vehiculo_id } });
    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con ID ${dto.vehiculo_id} no encontrado`);
    }

    if (vehiculo.estado !== 'disponible') {
      throw new BadRequestException(`El vehículo no está disponible para reserva`);
    }

    // Calcular días y precio total
    const fechaInicio = new Date(dto.fecha_inicio);
    const fechaFin = new Date(dto.fecha_fin);
    const dias = Math.ceil((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 3600 * 24));
    const precioTotal = dias * vehiculo.precio_por_dia;

    const reserva = this.reservaRepository.create({
      ...dto,
      cliente,
      vehiculo,
      precio_total: precioTotal,
    });

    // Cambiar estado del vehículo a reservado
    vehiculo.estado = 'reservado';
    await this.vehiculoRepository.save(vehiculo);

    return await this.reservaRepository.save(reserva);
  }

  async findAll(): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      relations: ['cliente', 'vehiculo']
    });
  }

  async findByCliente(clienteId: number): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      where: { cliente: { id: clienteId } },
      relations: ['cliente', 'vehiculo']
    });
  }

  async findByVehiculo(vehiculoId: number): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      where: { vehiculo: { id: vehiculoId } },
      relations: ['cliente', 'vehiculo']
    });
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['cliente', 'vehiculo']
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }
    return reserva;
  }

  async update(id: number, dto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.findOne(id);
    Object.assign(reserva, dto);
    return await this.reservaRepository.save(reserva);
  }

  async confirmar(id: number): Promise<Reserva> {
    const reserva = await this.findOne(id);
    reserva.estado = 'confirmada';
    return await this.reservaRepository.save(reserva);
  }

  async cancelar(id: number): Promise<Reserva> {
    const reserva = await this.findOne(id);
    reserva.estado = 'cancelada';
    
    // Liberar el vehículo
    const vehiculo = reserva.vehiculo;
    vehiculo.estado = 'disponible';
    await this.vehiculoRepository.save(vehiculo);

    return await this.reservaRepository.save(reserva);
  }

  async remove(id: number): Promise<void> {
    const reserva = await this.findOne(id);
    
    // Liberar el vehículo si la reserva está activa
    if (reserva.estado !== 'cancelada' && reserva.estado !== 'completada') {
      const vehiculo = reserva.vehiculo;
      vehiculo.estado = 'disponible';
      await this.vehiculoRepository.save(vehiculo);
    }

    await this.reservaRepository.remove(reserva);
  }
}
