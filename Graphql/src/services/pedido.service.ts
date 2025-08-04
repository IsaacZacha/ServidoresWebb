import { Injectable, NotFoundException } from '@nestjs/common';
import { Pedido, EstadoPedido } from '../entities/pedido.entity';
import { CreatePedidoDto, CreatePedidoConEntradasDto, UpdatePedidoDto } from '../dtos/pedido.dto';
import { JsonDataService } from './json-data.service';

@Injectable()
export class PedidoService {
  constructor(
    private readonly jsonDataService: JsonDataService,
  ) {}

  async crear(createPedidoDto: CreatePedidoConEntradasDto): Promise<Pedido> {
    const usuario = this.jsonDataService.findById('usuarios', createPedidoDto.usuarioId);
    
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${createPedidoDto.usuarioId} no encontrado`);
    }

    // Crear entradas primero
    const entradaIds: number[] = [];
    for (const entradaData of createPedidoDto.entradas) {
      const evento = this.jsonDataService.findById('eventos', entradaData.eventoId);
      const tipoEntrada = this.jsonDataService.findById('tiposEntrada', entradaData.tipoEntradaId);
      
      if (!evento) {
        throw new NotFoundException(`Evento con ID ${entradaData.eventoId} no encontrado`);
      }
      
      if (!tipoEntrada) {
        throw new NotFoundException(`Tipo de entrada con ID ${entradaData.tipoEntradaId} no encontrado`);
      }

      for (let i = 0; i < entradaData.cantidad; i++) {
        const entrada = this.jsonDataService.create('entradas', {
          eventoId: entradaData.eventoId,
          tipoEntradaId: entradaData.tipoEntradaId,
          precio: tipoEntrada.precio,
          estado: 'reservada'
        });
        entradaIds.push(entrada.id);
      }
    }

    const numeroPedido = this.getNextOrderNumber();
    const pedidoData = {
      usuarioId: createPedidoDto.usuarioId,
      entradaIds,
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
