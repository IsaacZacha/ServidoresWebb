import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  create(@Body() dto: CreateReservaDto) {
    return this.reservaService.create(dto);
  }

  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  @Get('cliente/:clienteId')
  findByCliente(@Param('clienteId') clienteId: string) {
    return this.reservaService.findByCliente(+clienteId);
  }

  @Get('vehiculo/:vehiculoId')
  findByVehiculo(@Param('vehiculoId') vehiculoId: string) {
    return this.reservaService.findByVehiculo(+vehiculoId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateReservaDto) {
    return this.reservaService.update(+id, dto);
  }

  @Patch(':id/confirmar')
  confirmar(@Param('id') id: string) {
    return this.reservaService.confirmar(+id);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id') id: string) {
    return this.reservaService.cancelar(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservaService.remove(+id);
  }
}
