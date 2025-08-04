import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Evento } from '../entities/evento.entity';
import { CreateEventoDto, UpdateEventoDto } from '../dtos/evento.dto';
import { JsonDataService } from './json-data.service';

@Injectable()
export class EventoService {
  constructor(
    private readonly jsonDataService: JsonDataService,
  ) {}

  async crear(createEventoDto: CreateEventoDto): Promise<Evento> {
    const ubicacion = this.jsonDataService.findById('ubicaciones', createEventoDto.ubicacionId);

    if (!ubicacion) {
      throw new NotFoundException(`Ubicación con ID ${createEventoDto.ubicacionId} no encontrada`);
    }

    const fechaEvento = new Date(createEventoDto.fechaEvento);
    if (fechaEvento <= new Date()) {
      throw new BadRequestException('La fecha del evento debe ser futura');
    }

    return this.jsonDataService.create('eventos', createEventoDto);
  }

  async encontrarTodos(): Promise<Evento[]> {
    const eventos = this.jsonDataService.findBy('eventos', { activo: true });
    return eventos.sort((a, b) => new Date(a.fechaEvento).getTime() - new Date(b.fechaEvento).getTime());
  }

  async encontrarPorId(id: number): Promise<Evento> {
    const evento = this.jsonDataService.findById('eventos', id);

    if (!evento) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }

    return evento;
  }

  async encontrarEventosProximos(): Promise<Evento[]> {
    const fechaActual = new Date();
    const eventos = this.jsonDataService.findBy('eventos', { activo: true });
    
    return eventos
      .filter(evento => new Date(evento.fechaEvento) >= fechaActual)
      .sort((a, b) => new Date(a.fechaEvento).getTime() - new Date(b.fechaEvento).getTime());
  }

  async encontrarPorUbicacion(ubicacionId: number): Promise<Evento[]> {
    const eventos = this.jsonDataService.findBy('eventos', { 
      ubicacionId: ubicacionId,
      activo: true 
    });
    
    return eventos.sort((a, b) => new Date(a.fechaEvento).getTime() - new Date(b.fechaEvento).getTime());
  }

  async actualizar(id: number, updateEventoDto: UpdateEventoDto): Promise<Evento> {
    const eventoExistente = this.jsonDataService.findById('eventos', id);
    
    if (!eventoExistente) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }

    const eventoActualizado = this.jsonDataService.update('eventos', id, updateEventoDto);
    
    if (!eventoActualizado) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }

    return eventoActualizado;
  }

  async desactivar(id: number): Promise<Evento> {
    const eventoExistente = this.jsonDataService.findById('eventos', id);
    
    if (!eventoExistente) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }

    const eventoDesactivado = this.jsonDataService.update('eventos', id, { activo: false });
    
    if (!eventoDesactivado) {
      throw new NotFoundException(`Evento con ID ${id} no encontrado`);
    }

    return eventoDesactivado;
  }

  async actualizarEntradasDisponibles(eventoId: number, cantidad: number): Promise<void> {
    const evento = this.jsonDataService.findById('eventos', eventoId);
    
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${eventoId} no encontrado`);
    }

    const nuevasEntradasDisponibles = evento.entradasDisponibles + cantidad;
    this.jsonDataService.update('eventos', eventoId, { 
      entradasDisponibles: nuevasEntradasDisponibles 
    });
  }

  async encontrarEventosDestacados(): Promise<Evento[]> {
    const eventos = this.jsonDataService.findBy('eventos', { activo: true });
    
    // Filtrar eventos destacados (puedes agregar un campo 'destacado' o usar otra lógica)
    return eventos
      .filter(evento => evento.entradasDisponibles > 0)
      .sort((a, b) => b.entradasDisponibles - a.entradasDisponibles)
      .slice(0, 6); // Top 6 eventos más populares
  }

  async buscarEventos(query: string, ubicacion?: string): Promise<Evento[]> {
    let eventos = this.jsonDataService.findBy('eventos', { activo: true });
    
    // Filtrar por query de búsqueda
    if (query) {
      const queryLower = query.toLowerCase();
      eventos = eventos.filter(evento => 
        evento.nombre.toLowerCase().includes(queryLower) ||
        evento.descripcion.toLowerCase().includes(queryLower)
      );
    }
    
    // Filtrar por ubicación si se proporciona
    if (ubicacion) {
      const ubicacionLower = ubicacion.toLowerCase();
      const ubicaciones = this.jsonDataService.findAll('ubicaciones');
      const ubicacionEncontrada = ubicaciones.find(ub => 
        ub.ciudad.toLowerCase().includes(ubicacionLower) ||
        ub.nombre.toLowerCase().includes(ubicacionLower)
      );
      
      if (ubicacionEncontrada) {
        eventos = eventos.filter(evento => evento.ubicacionId === ubicacionEncontrada.id);
      }
    }
    
    return eventos.sort((a, b) => new Date(a.fechaEvento).getTime() - new Date(b.fechaEvento).getTime());
  }
}
