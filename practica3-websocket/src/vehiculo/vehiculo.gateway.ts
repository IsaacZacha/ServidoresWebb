import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@WebSocketGateway({ cors: true })
export class VehiculoGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly vehiculoService: VehiculoService) {}

  @SubscribeMessage('crearVehiculo')
  async create(@MessageBody() dto: CreateVehiculoDto) {
    await this.vehiculoService.create(dto);
    const vehiculos = await this.vehiculoService.findAll();
    this.server.emit('vehiculosActualizados', vehiculos);
  }

  @SubscribeMessage('listarVehiculos')
  async findAll() {
    const vehiculos = await this.vehiculoService.findAll();
    this.server.emit('vehiculosActualizados', vehiculos);
  }

  @SubscribeMessage('actualizarVehiculo')
  async update(
    @MessageBody()
    payload: { id: number; data: UpdateVehiculoDto },
  ) {
    await this.vehiculoService.update(payload.id, payload.data);
    const vehiculos = await this.vehiculoService.findAll();
    this.server.emit('vehiculosActualizados', vehiculos);
  }

  @SubscribeMessage('eliminarVehiculo')
  async remove(@MessageBody() payload: { id: number }) {
    await this.vehiculoService.remove(payload.id);
    const vehiculos = await this.vehiculoService.findAll();
    this.server.emit('vehiculosActualizados', vehiculos);
  }
}
