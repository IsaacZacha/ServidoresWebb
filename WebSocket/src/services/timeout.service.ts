import { Injectable, Logger } from '@nestjs/common';
import { PagoGateway } from '../gateways/pago.gateway';
import { NotificacionesGateway } from '../gateways/notificaciones.gateway';
import { PedidoService } from './pedido.service';
import { EstadoPedido } from '../entities/pedido.entity';

export interface TimeoutPago {
  pedidoId: number;
  usuarioId: number;
  timeoutId: any;
  tiempoExpiracion: Date;
}

@Injectable()
export class TimeoutService {
  private readonly logger = new Logger(TimeoutService.name);
  private timeouts = new Map<number, TimeoutPago>();
  private readonly TIEMPO_LIMITE_PAGO = 10 * 60 * 1000; // 10 minutos

  constructor(
    private readonly pagoGateway: PagoGateway,
    private readonly notificacionesGateway: NotificacionesGateway,
    private readonly pedidoService: PedidoService,
  ) {}

  // Iniciar timeout para un pedido
  iniciarTimeoutPago(pedidoId: number, usuarioId: number): void {
    // Si ya existe un timeout para este pedido, cancelarlo
    this.cancelarTimeoutPago(pedidoId);

    const tiempoExpiracion = new Date(Date.now() + this.TIEMPO_LIMITE_PAGO);
    
    const timeoutId = setTimeout(async () => {
      await this.manejarTimeoutExpirado(pedidoId, usuarioId);
    }, this.TIEMPO_LIMITE_PAGO);

    this.timeouts.set(pedidoId, {
      pedidoId,
      usuarioId,
      timeoutId,
      tiempoExpiracion,
    });

    this.logger.log(`Timeout iniciado para pedido ${pedidoId}. Expira: ${tiempoExpiracion}`);
  }

  // Cancelar timeout (cuando el pago se completa)
  cancelarTimeoutPago(pedidoId: number): boolean {
    const timeout = this.timeouts.get(pedidoId);
    if (timeout) {
      clearTimeout(timeout.timeoutId);
      this.timeouts.delete(pedidoId);
      this.logger.log(`Timeout cancelado para pedido ${pedidoId}`);
      return true;
    }
    return false;
  }

  // Obtener tiempo restante para un pedido
  obtenerTiempoRestante(pedidoId: number): number | null {
    const timeout = this.timeouts.get(pedidoId);
    if (timeout) {
      const tiempoRestante = timeout.tiempoExpiracion.getTime() - Date.now();
      return Math.max(0, tiempoRestante);
    }
    return null;
  }

  // Verificar si un pedido tiene timeout activo
  tieneTimeoutActivo(pedidoId: number): boolean {
    return this.timeouts.has(pedidoId);
  }

  // Manejar cuando expira el timeout
  private async manejarTimeoutExpirado(pedidoId: number, usuarioId: number): Promise<void> {
    try {
      this.logger.warn(`Timeout expirado para pedido ${pedidoId}`);

      // Actualizar estado del pedido a expirado
      await this.pedidoService.actualizar(pedidoId, { 
        estado: EstadoPedido.CANCELADO 
      });

      // Notificar a través de WebSocket
      this.pagoGateway.notificarTimeoutPago(pedidoId);
      this.notificacionesGateway.notificarTiempoExpirado(usuarioId, pedidoId);

      // Limpiar el timeout del mapa
      this.timeouts.delete(pedidoId);

    } catch (error) {
      this.logger.error(`Error manejando timeout expirado para pedido ${pedidoId}: ${error.message}`);
    }
  }

  // Obtener todos los timeouts activos (para debugging)
  obtenerTimeoutsActivos(): TimeoutPago[] {
    return Array.from(this.timeouts.values()).map(timeout => ({
      ...timeout,
      timeoutId: undefined as any, // No exponemos el timeout ID
    }));
  }

  // Limpiar todos los timeouts (útil para tests o shutdown)
  limpiarTodosLosTimeouts(): void {
    for (const timeout of this.timeouts.values()) {
      clearTimeout(timeout.timeoutId);
    }
    this.timeouts.clear();
    this.logger.log('Todos los timeouts han sido limpiados');
  }
}
