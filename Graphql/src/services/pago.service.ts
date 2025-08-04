import { Injectable, NotFoundException } from '@nestjs/common';
import { Pago, EstadoPago } from '../entities/pago.entity';
import { CreatePagoDto, UpdatePagoDto } from '../dtos/pago.dto';
import { JsonDataService } from './json-data.service';

@Injectable()
export class PagoService {
  constructor(
    private readonly jsonDataService: JsonDataService,
  ) {}

  async crear(createPagoDto: CreatePagoDto): Promise<Pago> {
    const pedido = this.jsonDataService.findById('pedidos', createPagoDto.pedidoId);
    
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${createPagoDto.pedidoId} no encontrado`);
    }

    const transaccionId = this.generateTransactionId();
    const pagoData = {
      ...createPagoDto,
      transaccionId,
      estado: EstadoPago.PENDIENTE
    };

    return this.jsonDataService.create('pagos', pagoData);
  }

  async encontrarTodos(): Promise<Pago[]> {
    return this.jsonDataService.findAll('pagos');
  }

  async encontrarPorId(id: number): Promise<Pago> {
    const pago = this.jsonDataService.findById('pagos', id);

    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    return pago;
  }

  async encontrarPorPedido(pedidoId: number): Promise<Pago[]> {
    return this.jsonDataService.findBy('pagos', { pedidoId });
  }

  async procesar(id: number): Promise<Pago> {
    const pago = this.jsonDataService.findById('pagos', id);
    
    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    const pagoProcesado = this.jsonDataService.update('pagos', id, { 
      estado: EstadoPago.COMPLETADO,
      fechaProcesamiento: new Date().toISOString()
    });

    return pagoProcesado;
  }

  async fallar(id: number): Promise<Pago> {
    const pago = this.jsonDataService.findById('pagos', id);
    
    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    const pagoFallido = this.jsonDataService.update('pagos', id, { 
      estado: EstadoPago.FALLIDO 
    });

    return pagoFallido;
  }

  async reembolsar(id: number): Promise<Pago> {
    const pago = this.jsonDataService.findById('pagos', id);
    
    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    if (pago.estado !== EstadoPago.COMPLETADO) {
      throw new Error('Solo se pueden reembolsar pagos completados');
    }

    const pagoReembolsado = this.jsonDataService.update('pagos', id, { 
      estado: EstadoPago.REEMBOLSADO,
      fechaReembolso: new Date().toISOString()
    });

    return pagoReembolsado;
  }

  async actualizar(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pagoExistente = this.jsonDataService.findById('pagos', id);
    
    if (!pagoExistente) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    const pagoActualizado = this.jsonDataService.update('pagos', id, updatePagoDto);
    
    if (!pagoActualizado) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    return pagoActualizado;
  }

  private generateTransactionId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `TXN-${timestamp}-${random.toUpperCase()}`;
  }
}
