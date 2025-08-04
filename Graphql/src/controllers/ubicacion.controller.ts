import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { UbicacionService } from '..//services/ubicacion.service';
import { CreateUbicacionDto, UpdateUbicacionDto } from '../dtos/ubicacion.dto';

@Controller('ubicaciones')
export class UbicacionController {
  constructor(private readonly ubicacionService: UbicacionService) {}

  @Post()
  async crear(@Body() createUbicacionDto: CreateUbicacionDto) {
    const ubicacion = await this.ubicacionService.crear(createUbicacionDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Ubicación creada exitosamente',
      data: ubicacion
    };
  }

  @Get()
  async encontrarTodas() {
    const ubicaciones = await this.ubicacionService.encontrarTodos();
    return {
      statusCode: HttpStatus.OK,
      data: ubicaciones
    };
  }

  @Get(':id')
  async encontrarPorId(@Param('id', ParseIntPipe) id: number) {
    const ubicacion = await this.ubicacionService.encontrarPorId(id);
    return {
      statusCode: HttpStatus.OK,
      data: ubicacion
    };
  }

  @Get(':id/eventos')
  async encontrarEventosPorUbicacion(@Param('id', ParseIntPipe) id: number) {
    const eventos = await this.ubicacionService.encontrarEventosPorUbicacion(id);
    return {
      statusCode: HttpStatus.OK,
      data: eventos
    };
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUbicacionDto: UpdateUbicacionDto
  ) {
    const ubicacion = await this.ubicacionService.actualizar(id, updateUbicacionDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Ubicación actualizada exitosamente',
      data: ubicacion
    };
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.ubicacionService.eliminar(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Ubicación eliminada exitosamente'
    };
  }
}
