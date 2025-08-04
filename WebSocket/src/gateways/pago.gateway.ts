import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, Logger } from '@nestjs/common';
import { PagoService } from '../services/pago.service';
import { PedidoService } from '../services/pedido.service';
import { MetodoPago, EstadoPago } from '../entities/pago.entity';
import { EstadoPedido } from '../entities/pedido.entity';

export interface ClienteConectado {
  id: string;
  usuarioId?: number;
  pedidoId?: number;
}

export interface ActualizacionPago {
  pedidoId: number;
  estado: string;
  progreso: number;
  mensaje: string;
  timestamp: Date;
}

export interface ConfirmacionPedido {
  pedidoId: number;
  usuarioId: number;
  total: number;
  estado: string;
  metodoPago: MetodoPago;
  nombreCompleto?: string;
  correoElectronico?: string;
}

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  namespace: '/pago',
})
export class PagoGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(PagoGateway.name);
  private clientesConectados = new Map<string, ClienteConectado>();

  constructor(
    private readonly pagoService: PagoService,
    private readonly pedidoService: PedidoService,
  ) {}

  // Conexión y desconexión
  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
    this.clientesConectados.set(client.id, { id: client.id });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
    this.clientesConectados.delete(client.id);
  }

  // Suscribirse a actualizaciones de un pedido específico
  @SubscribeMessage('suscribirse-pedido')
  async suscribirsePedido(
    @MessageBody() data: { pedidoId: number; usuarioId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const clienteInfo = this.clientesConectados.get(client.id);
    if (clienteInfo) {
      clienteInfo.usuarioId = data.usuarioId;
      clienteInfo.pedidoId = data.pedidoId;
      this.clientesConectados.set(client.id, clienteInfo);
    }

    // Unirse a la sala del pedido
    await client.join(`pedido-${data.pedidoId}`);
    
    this.logger.log(`Cliente ${client.id} suscrito al pedido ${data.pedidoId}`);

    // Enviar estado actual del pedido
    try {
      const pedido = await this.pedidoService.encontrarPorId(data.pedidoId);
      client.emit('estado-pedido', {
        pedidoId: data.pedidoId,
        estado: pedido.estado,
        total: pedido.total,
        timestamp: new Date(),
      });
    } catch (error) {
      client.emit('error-pedido', {
        mensaje: 'No se pudo obtener el estado del pedido',
        timestamp: new Date(),
      });
    }
  }

  // Iniciar proceso de pago
  @SubscribeMessage('iniciar-pago')
  async iniciarPago(
    @MessageBody() data: ConfirmacionPedido,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      this.logger.log(`Iniciando pago para pedido ${data.pedidoId}`);

      // Emitir progreso inicial
      this.emitirActualizacionPago(data.pedidoId, {
        pedidoId: data.pedidoId,
        estado: 'INICIANDO',
        progreso: 10,
        mensaje: 'Iniciando proceso de pago...',
        timestamp: new Date(),
      });

      // Simular validación de datos
      await this.delay(1000);
      this.emitirActualizacionPago(data.pedidoId, {
        pedidoId: data.pedidoId,
        estado: 'VALIDANDO',
        progreso: 30,
        mensaje: 'Validando información del comprador...',
        timestamp: new Date(),
      });

      // Simular procesamiento del pago
      await this.delay(1500);
      this.emitirActualizacionPago(data.pedidoId, {
        pedidoId: data.pedidoId,
        estado: 'PROCESANDO',
        progreso: 60,
        mensaje: `Procesando pago con ${data.metodoPago}...`,
        timestamp: new Date(),
      });

      // Crear el pago en la base de datos
      const pago = await this.pagoService.crear({
        pedidoId: data.pedidoId,
        metodoPago: data.metodoPago,
        monto: data.total,
      });

      // Procesar el pago
      await this.delay(1000);
      const pagoCompletado = await this.pagoService.procesar(pago.id);

      // Emitir confirmación final
      this.emitirActualizacionPago(data.pedidoId, {
        pedidoId: data.pedidoId,
        estado: 'COMPLETADO',
        progreso: 100,
        mensaje: 'Pago completado exitosamente',
        timestamp: new Date(),
      });

      // Emitir confirmación del pedido
      client.emit('pago-completado', {
        pedidoId: data.pedidoId,
        pagoId: pagoCompletado.id,
        numeroTransaccion: `TXN-${pagoCompletado.id}-${Date.now()}`,
        total: data.total,
        metodoPago: data.metodoPago,
        timestamp: new Date(),
      });

    } catch (error) {
      this.logger.error(`Error procesando pago: ${error.message}`);
      
      this.emitirActualizacionPago(data.pedidoId, {
        pedidoId: data.pedidoId,
        estado: 'ERROR',
        progreso: 0,
        mensaje: 'Error al procesar el pago. Intente nuevamente.',
        timestamp: new Date(),
      });

      client.emit('error-pago', {
        pedidoId: data.pedidoId,
        mensaje: error.message,
        timestamp: new Date(),
      });
    }
  }

  // Cancelar pago
  @SubscribeMessage('cancelar-pago')
  async cancelarPago(
    @MessageBody() data: { pedidoId: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // Actualizar estado del pedido
      await this.pedidoService.actualizar(data.pedidoId, { estado: EstadoPedido.CANCELADO });

      this.emitirActualizacionPago(data.pedidoId, {
        pedidoId: data.pedidoId,
        estado: 'CANCELADO',
        progreso: 0,
        mensaje: 'Pago cancelado por el usuario',
        timestamp: new Date(),
      });

      client.emit('pago-cancelado', {
        pedidoId: data.pedidoId,
        timestamp: new Date(),
      });

    } catch (error) {
      client.emit('error-cancelacion', {
        mensaje: error.message,
        timestamp: new Date(),
      });
    }
  }

  // Obtener resumen del pedido
  @SubscribeMessage('obtener-resumen-pedido')
  async obtenerResumenPedido(
    @MessageBody() data: { pedidoId: number },
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const pedido = await this.pedidoService.encontrarPorId(data.pedidoId);

      client.emit('resumen-pedido', {
        pedidoId: data.pedidoId,
        estado: pedido.estado,
        total: pedido.total,
        entradas: pedido.entradas || [],
        fechaCreacion: pedido.fechaCreacion,
        timestamp: new Date(),
      });

    } catch (error) {
      client.emit('error-resumen', {
        mensaje: error.message,
        timestamp: new Date(),
      });
    }
  }

  // Métodos auxiliares
  private emitirActualizacionPago(pedidoId: number, actualizacion: ActualizacionPago) {
    this.server.to(`pedido-${pedidoId}`).emit('actualizacion-pago', actualizacion);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Métodos públicos para ser llamados desde otros servicios
  public notificarActualizacionPedido(pedidoId: number, estado: string, mensaje: string) {
    this.server.to(`pedido-${pedidoId}`).emit('actualizacion-pedido', {
      pedidoId,
      estado,
      mensaje,
      timestamp: new Date(),
    });
  }

  public notificarTimeoutPago(pedidoId: number) {
    this.emitirActualizacionPago(pedidoId, {
      pedidoId,
      estado: 'TIMEOUT',
      progreso: 0,
      mensaje: 'El tiempo para completar el pago ha expirado',
      timestamp: new Date(),
    });
  }
}
