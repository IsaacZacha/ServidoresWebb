import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@WebSocketGateway({ cors: true })
export class ClienteGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly clienteService: ClienteService) {}

  @SubscribeMessage('crearCliente')
  async create(@MessageBody() dto: CreateClienteDto) {
    await this.clienteService.create(dto);
    const clientes = await this.clienteService.findAll();
    this.server.emit('clientesActualizados', clientes);
  }

  @SubscribeMessage('listarClientes')
  async findAll() {
    const clientes = await this.clienteService.findAll();
    this.server.emit('clientesActualizados', clientes);
  }

  @SubscribeMessage('actualizarCliente')
  async update(
    @MessageBody()
    payload: { id: number; data: UpdateClienteDto },
  ) {
    await this.clienteService.update(payload.id, payload.data);
    const clientes = await this.clienteService.findAll();
    this.server.emit('clientesActualizados', clientes);
  }

  @SubscribeMessage('eliminarCliente')
  async remove(@MessageBody() payload: { id: number }) {
    await this.clienteService.remove(payload.id);
    const clientes = await this.clienteService.findAll();
    this.server.emit('clientesActualizados', clientes);
  }
}
