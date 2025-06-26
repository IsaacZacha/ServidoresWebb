import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Controller('vehiculos')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Post()
  create(@Body() dto: CreateVehiculoDto) {
    return this.vehiculoService.create(dto);
  }

  @Get()
  findAll() {
    return this.vehiculoService.findAll();
  }

  @Get('disponibles')
  findAvailable() {
    return this.vehiculoService.findAvailable();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiculoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVehiculoDto) {
    return this.vehiculoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiculoService.remove(+id);
  }
}
