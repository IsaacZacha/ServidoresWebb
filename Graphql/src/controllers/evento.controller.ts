import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { EventoService } from '../services/evento.service';
import { CreateEventoDto, UpdateEventoDto } from '../dtos/evento.dto';

@Controller('eventos')
export class EventoController {
  constructor(private readonly eventoService: EventoService) {}

  @Post()
  async crear(@Body() createEventoDto: CreateEventoDto) {
    const evento = await this.eventoService.crear(createEventoDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Evento creado exitosamente',
      data: evento
    };
  }

  @Get()
  async encontrarTodos() {
    const eventos = await this.eventoService.encontrarTodos();
    return {
      statusCode: HttpStatus.OK,
      data: eventos
    };
  }

  @Get('proximos')
  async encontrarEventosProximos() {
    const eventos = await this.eventoService.encontrarEventosProximos();
    return {
      statusCode: HttpStatus.OK,
      data: eventos
    };
  }

  @Get(':id')
  async encontrarPorId(@Param('id', ParseIntPipe) id: number) {
    const evento = await this.eventoService.encontrarPorId(id);
    return {
      statusCode: HttpStatus.OK,
      data: evento
    };
  }

  @Get('ubicacion/:ubicacionId')
  async encontrarPorUbicacion(@Param('ubicacionId', ParseIntPipe) ubicacionId: number) {
    const eventos = await this.eventoService.encontrarPorUbicacion(ubicacionId);
    return {
      statusCode: HttpStatus.OK,
      data: eventos
    };
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventoDto: UpdateEventoDto
  ) {
    const evento = await this.eventoService.actualizar(id, updateEventoDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Evento actualizado exitosamente',
      data: evento
    };
  }

  @Delete(':id')
  async desactivar(@Param('id', ParseIntPipe) id: number) {
    const evento = await this.eventoService.desactivar(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Evento desactivado exitosamente',
      data: evento
    };
  }
}
