import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  create(dto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(dto);
    return this.clienteRepository.save(cliente);
  }

  findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto): Promise<Cliente> {
    await this.clienteRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}
