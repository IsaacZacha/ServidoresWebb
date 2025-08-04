import { Controller, Get, Query, HttpStatus } from '@nestjs/common';
import { EventoService } from '../services/evento.service';
import { UbicacionService } from '../services/ubicacion.service';

@Controller('seleccion')
export class SeleccionController {
  constructor(
    private readonly eventoService: EventoService,
    private readonly ubicacionService: UbicacionService,
  ) {}

  @Get('eventos-destacados')
  async obtenerEventosDestacados() {
    const eventos = await this.eventoService.encontrarEventosDestacados();
    return {
      statusCode: HttpStatus.OK,
      message: 'Eventos destacados obtenidos exitosamente',
      data: eventos
    };
  }

  @Get('ubicaciones-disponibles')
  async obtenerUbicacionesDisponibles() {
    const ubicaciones = await this.ubicacionService.encontrarTodos();
    
    // Obtener ubicaciones que tienen eventos activos
    const ubicacionesConEventos: any[] = [];
    
    for (const ubicacion of ubicaciones) {
      const eventos = await this.ubicacionService.encontrarEventosPorUbicacion(ubicacion.id);
      if (eventos.length > 0) {
        ubicacionesConEventos.push({
          ...ubicacion,
          totalEventos: eventos.length
        });
      }
    }
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Ubicaciones disponibles obtenidas exitosamente',
      data: ubicacionesConEventos
    };
  }

  @Get('eventos-por-ubicacion')
  async obtenerEventosPorUbicacion(@Query('ubicacionId') ubicacionId: string) {
    if (!ubicacionId) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'El parámetro ubicacionId es requerido'
      };
    }

    const eventos = await this.ubicacionService.encontrarEventosPorUbicacion(parseInt(ubicacionId));
    const ubicacion = await this.ubicacionService.encontrarPorId(parseInt(ubicacionId));
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Eventos por ubicación obtenidos exitosamente',
      data: {
        ubicacion,
        eventos
      }
    };
  }

  @Get('buscar-eventos')
  async buscarEventos(
    @Query('q') query?: string,
    @Query('ubicacion') ubicacion?: string,
    @Query('fecha') fecha?: string
  ) {
    let eventos = await this.eventoService.buscarEventos(query || '', ubicacion);
    
    // Filtro por fecha
    if (fecha) {
      const fechaBusqueda = new Date(fecha);
      eventos = eventos.filter(evento => {
        const fechaEvento = new Date(evento.fechaEvento);
        return fechaEvento.toDateString() === fechaBusqueda.toDateString();
      });
    }
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Resultados de búsqueda obtenidos exitosamente',
      data: {
        query: query || '',
        ubicacion: ubicacion || '',
        fecha: fecha || '',
        resultados: eventos,
        total: eventos.length
      }
    };
  }

  @Get('ubicaciones-populares')
  async obtenerUbicacionesPopulares() {
    const eventos = await this.eventoService.encontrarTodos();
    const ubicacionesPopulares = [...new Set(eventos.map(evento => evento.ubicacion?.ciudad || 'Sin ubicación'))];
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Ubicaciones populares obtenidas exitosamente',
      data: ubicacionesPopulares
    };
  }
}
