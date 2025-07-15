import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@WebSocketGateway({ cors: true })
export class ReservaGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly reservaService: ReservaService) {}

  @SubscribeMessage('crearReserva')
  async create(@MessageBody() dto: CreateReservaDto) {
    await this.reservaService.create(dto);
    const reservas = await this.reservaService.findAll();
    this.server.emit('reservasActualizadas', reservas);
  }

  @SubscribeMessage('listarReservas')
  async findAll() {
    const reservas = await this.reservaService.findAll();
    this.server.emit('reservasActualizadas', reservas);
  }

  @SubscribeMessage('actualizarReserva')
  async update(
    @MessageBody()
    payload: { id: number; data: UpdateReservaDto },
  ) {
    await this.reservaService.update(payload.id, payload.data);
    const reservas = await this.reservaService.findAll();
    this.server.emit('reservasActualizadas', reservas);
  }

  @SubscribeMessage('eliminarReserva')
  async remove(@MessageBody() payload: { id: number }) {
    await this.reservaService.remove(payload.id);
    const reservas = await this.reservaService.findAll();
    this.server.emit('reservasActualizadas', reservas);
  }
}
