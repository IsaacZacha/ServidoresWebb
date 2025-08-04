import { Injectable, NotFoundException } from '@nestjs/common';
import { Pedido, EstadoPedido } from '../entities/pedido.entity';
import { CreatePedidoDto, UpdatePedidoDto } from '../dtos/pedido.dto';
import { JsonDataService } from './json-data.service';

@Injectable()
export class PedidoService {
  constructor(
    private readonly jsonDataService: JsonDataService,
  ) {}

  async crear(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const usuario = this.jsonDataService.findById('usuarios', createPedidoDto.usuarioId);
    
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${createPedidoDto.usuarioId} no encontrado`);
    }

    const numeroPedido = this.getNextOrderNumber();
    const pedidoData = {
      ...createPedidoDto,
      numeroPedido,
      estado: EstadoPedido.PENDIENTE
    };

    return this.jsonDataService.create('pedidos', pedidoData);
  }

  async encontrarTodos(): Promise<Pedido[]> {
    return this.jsonDataService.findAll('pedidos');
  }

  async encontrarPorId(id: number): Promise<Pedido> {
    const pedido = this.jsonDataService.findById('pedidos', id);

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return pedido;
  }

  async encontrarPorUsuario(usuarioId: number): Promise<Pedido[]> {
    return this.jsonDataService.findBy('pedidos', { usuarioId });
  }

  async confirmar(id: number): Promise<Pedido> {
    const pedido = this.jsonDataService.findById('pedidos', id);
    
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    const pedidoConfirmado = this.jsonDataService.update('pedidos', id, { 
      estado: EstadoPedido.CONFIRMADO 
    });

    return pedidoConfirmado;
  }

  async cancelar(id: number): Promise<Pedido> {
    const pedido = this.jsonDataService.findById('pedidos', id);
    
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    const pedidoCancelado = this.jsonDataService.update('pedidos', id, { 
      estado: EstadoPedido.CANCELADO 
    });

    return pedidoCancelado;
  }

  async actualizar(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedidoExistente = this.jsonDataService.findById('pedidos', id);
    
    if (!pedidoExistente) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    const pedidoActualizado = this.jsonDataService.update('pedidos', id, updatePedidoDto);
    
    if (!pedidoActualizado) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    return pedidoActualizado;
  }

  private getNextOrderNumber(): string {
    const pedidos = this.jsonDataService.findAll('pedidos');
    const year = new Date().getFullYear();
    const count = pedidos.filter((p: any) => p.numeroPedido?.includes(`PED-${year}`)).length + 1;
    return `PED-${year}-${count.toString().padStart(3, '0')}`;
  }
}
