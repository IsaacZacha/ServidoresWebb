import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface DatabaseData {
  usuarios: any[];
  ubicaciones: any[];
  eventos: any[];
  tiposEntrada: any[];
  entradas: any[];
  pedidos: any[];
  pagos: any[];
  enums: any;
  metadata: any;
}

@Injectable()
export class JsonDataService {
  private readonly dataPath = path.join(process.cwd(), 'data.json');
  private data: DatabaseData;

  constructor() {
    this.loadData();
  }

  private loadData(): void {
    try {
      const fileContent = fs.readFileSync(this.dataPath, 'utf8');
      this.data = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error loading data.json:', error);
      this.data = {
        usuarios: [],
        ubicaciones: [],
        eventos: [],
        tiposEntrada: [],
        entradas: [],
        pedidos: [],
        pagos: [],
        enums: {},
        metadata: {}
      };
    }
  }

  private saveData(): void {
    try {
      fs.writeFileSync(this.dataPath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error saving data.json:', error);
    }
  }

  findAll(collection: keyof DatabaseData): any[] {
    return this.data[collection] as any[] || [];
  }

  findById(collection: keyof DatabaseData, id: number): any | undefined {
    const items = this.data[collection] as any[];
    return items?.find(item => item.id === id);
  }

  findBy(collection: keyof DatabaseData, criteria: any): any[] {
    const items = this.data[collection] as any[];
    if (!items) return [];
    
    return items.filter(item => {
      return Object.keys(criteria).every(key => 
        item[key] === criteria[key]
      );
    });
  }

  findOneBy(collection: keyof DatabaseData, criteria: any): any | undefined {
    const results = this.findBy(collection, criteria);
    return results[0];
  }

  create(collection: keyof DatabaseData, data: any): any {
    const items = this.data[collection] as any[];
    const maxId = items.length > 0 ? Math.max(...items.map(item => item.id || 0)) : 0;
    const newItem = {
      ...data,
      id: maxId + 1,
      fechaCreacion: new Date().toISOString(),
      fechaActualizacion: new Date().toISOString()
    };

    items.push(newItem);
    this.saveData();
    return newItem;
  }

  update(collection: keyof DatabaseData, id: number, data: any): any | null {
    const items = this.data[collection] as any[];
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...data,
      fechaActualizacion: new Date().toISOString()
    };

    this.saveData();
    return items[index];
  }

  delete(collection: keyof DatabaseData, id: number): boolean {
    const items = this.data[collection] as any[];
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return false;

    items.splice(index, 1);
    this.saveData();
    return true;
  }

  // Método para simular relaciones como en TypeORM
  findWithRelations(collection: keyof DatabaseData, id: number, relations: string[]): any | undefined {
    const item = this.findById(collection, id);
    if (!item) return undefined;

    const result = { ...item };

    relations.forEach(relation => {
      if (relation === 'pedidos' && collection === 'usuarios') {
        result['pedidos'] = this.findBy('pedidos', { usuarioId: id });
      } else if (relation === 'eventos' && collection === 'ubicaciones') {
        result['eventos'] = this.findBy('eventos', { ubicacionId: id });
      } else if (relation === 'ubicacion' && collection === 'eventos') {
        result['ubicacion'] = this.findById('ubicaciones', result['ubicacionId']);
      } else if (relation === 'tiposEntrada' && collection === 'eventos') {
        result['tiposEntrada'] = this.findBy('tiposEntrada', { eventoId: id });
      } else if (relation === 'entradas' && collection === 'eventos') {
        result['entradas'] = this.findBy('entradas', { eventoId: id });
      } else if (relation === 'usuario' && collection === 'pedidos') {
        result['usuario'] = this.findById('usuarios', result['usuarioId']);
      } else if (relation === 'entradas' && collection === 'pedidos') {
        result['entradas'] = this.findBy('entradas', { pedidoId: id });
      } else if (relation === 'pago' && collection === 'pedidos') {
        result['pago'] = this.findOneBy('pagos', { pedidoId: id });
      }
    });

    return result;
  }
}
