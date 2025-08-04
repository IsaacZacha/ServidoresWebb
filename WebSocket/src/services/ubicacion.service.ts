import { Injectable, NotFoundException } from '@nestjs/common';
import { Ubicacion } from '../entities/ubicacion.entity';
import { CreateUbicacionDto, UpdateUbicacionDto } from '../dtos/ubicacion.dto';
import { JsonDataService } from './json-data.service';

@Injectable()
export class UbicacionService {
  constructor(
    private readonly jsonDataService: JsonDataService,
  ) {}

  async crear(createUbicacionDto: CreateUbicacionDto): Promise<Ubicacion> {
    return this.jsonDataService.create('ubicaciones', createUbicacionDto);
  }

  async encontrarTodos(): Promise<Ubicacion[]> {
    return this.jsonDataService.findAll('ubicaciones');
  }

  async encontrarPorId(id: number): Promise<Ubicacion> {
    const ubicacion = this.jsonDataService.findById('ubicaciones', id);

    if (!ubicacion) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }

    return ubicacion;
  }

  async encontrarPorCiudad(ciudad: string): Promise<Ubicacion[]> {
    return this.jsonDataService.findBy('ubicaciones', { ciudad });
  }

  async actualizar(id: number, updateUbicacionDto: UpdateUbicacionDto): Promise<Ubicacion> {
    const ubicacionExistente = this.jsonDataService.findById('ubicaciones', id);
    
    if (!ubicacionExistente) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }

    const ubicacionActualizada = this.jsonDataService.update('ubicaciones', id, updateUbicacionDto);
    
    if (!ubicacionActualizada) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }

    return ubicacionActualizada;
  }

  async eliminar(id: number): Promise<void> {
    const ubicacion = this.jsonDataService.findById('ubicaciones', id);
    
    if (!ubicacion) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }

    const eliminado = this.jsonDataService.delete('ubicaciones', id);
    
    if (!eliminado) {
      throw new NotFoundException(`Ubicación con ID ${id} no encontrada`);
    }
  }

  async encontrarEventosPorUbicacion(ubicacionId: number): Promise<any[]> {
    const ubicacion = this.jsonDataService.findById('ubicaciones', ubicacionId);
    
    if (!ubicacion) {
      throw new NotFoundException(`Ubicación con ID ${ubicacionId} no encontrada`);
    }

    const eventos = this.jsonDataService.findBy('eventos', { 
      ubicacionId: ubicacionId,
      activo: true 
    });
    
    return eventos.sort((a, b) => new Date(a.fechaEvento).getTime() - new Date(b.fechaEvento).getTime());
  }
}
