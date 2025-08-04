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

export interface NotificacionTiempoReal {
  tipo: 'info' | 'success' | 'warning' | 'error';
  titulo: string;
  mensaje: string;
  usuarioId?: number;
  pedidoId?: number;
  timestamp: Date;
}

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  namespace: '/notificaciones',
})
export class NotificacionesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificacionesGateway.name);
  private usuariosConectados = new Map<string, number>(); // socketId -> usuarioId

  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado a notificaciones: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado de notificaciones: ${client.id}`);
    this.usuariosConectados.delete(client.id);
  }

  // Suscribirse a notificaciones de un usuario
  @SubscribeMessage('suscribirse-usuario')
  async suscribirseUsuario(
    @MessageBody() data: { usuarioId: number },
    @ConnectedSocket() client: Socket,
  ) {
    this.usuariosConectados.set(client.id, data.usuarioId);
    await client.join(`usuario-${data.usuarioId}`);
    
    this.logger.log(`Cliente ${client.id} suscrito a notificaciones del usuario ${data.usuarioId}`);

    // Enviar notificación de bienvenida
    client.emit('notificacion', {
      tipo: 'info',
      titulo: 'Conectado',
      mensaje: 'Recibirás actualizaciones en tiempo real sobre tus pedidos',
      usuarioId: data.usuarioId,
      timestamp: new Date(),
    });
  }

  // Métodos públicos para enviar notificaciones
  public enviarNotificacionUsuario(usuarioId: number, notificacion: Omit<NotificacionTiempoReal, 'usuarioId' | 'timestamp'>) {
    this.server.to(`usuario-${usuarioId}`).emit('notificacion', {
      ...notificacion,
      usuarioId,
      timestamp: new Date(),
    });
  }

  public enviarNotificacionGlobal(notificacion: Omit<NotificacionTiempoReal, 'timestamp'>) {
    this.server.emit('notificacion-global', {
      ...notificacion,
      timestamp: new Date(),
    });
  }

  // Notificaciones específicas para el proceso de compra
  public notificarPedidoCreado(usuarioId: number, pedidoId: number, total: number) {
    this.enviarNotificacionUsuario(usuarioId, {
      tipo: 'success',
      titulo: 'Pedido Creado',
      mensaje: `Tu pedido #${pedidoId} por $${total} ha sido creado exitosamente`,
      pedidoId,
    });
  }

  public notificarPagoIniciado(usuarioId: number, pedidoId: number) {
    this.enviarNotificacionUsuario(usuarioId, {
      tipo: 'info',
      titulo: 'Procesando Pago',
      mensaje: 'Tu pago está siendo procesado. No cierres esta ventana.',
      pedidoId,
    });
  }

  public notificarPagoCompletado(usuarioId: number, pedidoId: number, total: number) {
    this.enviarNotificacionUsuario(usuarioId, {
      tipo: 'success',
      titulo: 'Pago Completado',
      mensaje: `Tu pago de $${total} ha sido procesado exitosamente. ¡Disfruta el evento!`,
      pedidoId,
    });
  }

  public notificarPagoFallido(usuarioId: number, pedidoId: number, motivo: string) {
    this.enviarNotificacionUsuario(usuarioId, {
      tipo: 'error',
      titulo: 'Error en el Pago',
      mensaje: `Tu pago no pudo ser procesado: ${motivo}. Intenta nuevamente.`,
      pedidoId,
    });
  }

  public notificarTiempoExpirado(usuarioId: number, pedidoId: number) {
    this.enviarNotificacionUsuario(usuarioId, {
      tipo: 'warning',
      titulo: 'Tiempo Expirado',
      mensaje: 'El tiempo para completar tu compra ha expirado. Los asientos han sido liberados.',
      pedidoId,
    });
  }
}
