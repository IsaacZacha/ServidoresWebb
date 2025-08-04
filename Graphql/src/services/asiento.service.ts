import { Injectable, NotFoundException } from '@nestjs/common';
import { JsonDataService } from './json-data.service';

export interface Asiento {
  id: number;
  eventoId: number;
  seccion: string;
  fila: string;
  numero: number;
  ocupado: boolean;
  tipoAsiento: 'general' | 'vip' | 'premium';
  precio: number;
  posicionX: number;
  posicionY: number;
}

export interface SeccionAsientos {
  nombre: string;
  asientos: Asiento[];
  totalAsientos: number;
  asientosDisponibles: number;
}

@Injectable()
export class AsientoService {
  constructor(
    private readonly jsonDataService: JsonDataService,
  ) {}

  async obtenerAsientosPorEvento(eventoId: number): Promise<SeccionAsientos[]> {
    const evento = this.jsonDataService.findById('eventos', eventoId);
    
    if (!evento) {
      throw new NotFoundException(`Evento con ID ${eventoId} no encontrado`);
    }

    // Generar asientos dinámicamente basado en la capacidad del evento
    const asientos = this.generarAsientos(eventoId, evento.capacidadTotal);
    
    // Agrupar por secciones
    const secciones = this.agruparPorSecciones(asientos);
    
    return secciones;
  }

  async obtenerTiposEntradaPorEvento(eventoId: number): Promise<any[]> {
    const tiposEntrada = this.jsonDataService.findBy('tiposEntrada', { eventoId });
    return tiposEntrada;
  }

  async reservarAsientos(eventoId: number, asientosIds: number[], usuarioId: number): Promise<boolean> {
    // Simular reserva de asientos
    const asientos = this.generarAsientos(eventoId, 100); // Capacidad fija para demo
    const asientosAReservar = asientos.filter(a => asientosIds.includes(a.id));
    
    // Verificar que todos los asientos estén disponibles
    const asientosOcupados = asientosAReservar.filter(a => a.ocupado);
    if (asientosOcupados.length > 0) {
      throw new Error('Algunos asientos ya están ocupados');
    }

    // En una implementación real, aquí actualizarías la base de datos
    console.log(`Reservando asientos ${asientosIds.join(', ')} para usuario ${usuarioId} en evento ${eventoId}`);
    
    return true;
  }

  private generarAsientos(eventoId: number, capacidadTotal: number): Asiento[] {
    const asientos: Asiento[] = [];
    const secciones = ['General', 'VIP', 'Premium'];
    
    let asientoId = 1;
    
    for (let seccionIndex = 0; seccionIndex < secciones.length; seccionIndex++) {
      const seccion = secciones[seccionIndex];
      const asientosPorSeccion = Math.floor(capacidadTotal / secciones.length);
      const filasPorSeccion = seccionIndex === 0 ? 10 : seccionIndex === 1 ? 5 : 3;
      const asientosPorFila = Math.floor(asientosPorSeccion / filasPorSeccion);
      
      for (let fila = 1; fila <= filasPorSeccion; fila++) {
        for (let numero = 1; numero <= asientosPorFila; numero++) {
          asientos.push({
            id: asientoId++,
            eventoId,
            seccion,
            fila: String.fromCharCode(64 + fila), // A, B, C, etc.
            numero,
            ocupado: Math.random() < 0.3, // 30% de asientos ocupados aleatoriamente
            tipoAsiento: seccion.toLowerCase() as 'general' | 'vip' | 'premium',
            precio: this.calcularPrecio(seccion),
            posicionX: numero * 40,
            posicionY: fila * 40
          });
        }
      }
    }
    
    return asientos;
  }

  private agruparPorSecciones(asientos: Asiento[]): SeccionAsientos[] {
    const seccionesMap = new Map<string, Asiento[]>();
    
    asientos.forEach(asiento => {
      if (!seccionesMap.has(asiento.seccion)) {
        seccionesMap.set(asiento.seccion, []);
      }
      seccionesMap.get(asiento.seccion)!.push(asiento);
    });
    
    return Array.from(seccionesMap.entries()).map(([nombre, asientos]) => ({
      nombre,
      asientos,
      totalAsientos: asientos.length,
      asientosDisponibles: asientos.filter(a => !a.ocupado).length
    }));
  }

  private calcularPrecio(seccion: string): number {
    switch (seccion.toLowerCase()) {
      case 'general':
        return 50000;
      case 'vip':
        return 100000;
      case 'premium':
        return 150000;
      default:
        return 50000;
    }
  }
}
