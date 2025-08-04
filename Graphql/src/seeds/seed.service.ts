import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Ubicacion } from '../entities/ubicacion.entity';
import { Evento } from '../entities/evento.entity';
import { TipoEntrada, TipoEntradaEnum } from '../entities/tipo-entrada.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Ubicacion)
    private ubicacionRepository: Repository<Ubicacion>,
    @InjectRepository(Evento)
    private eventoRepository: Repository<Evento>,
    @InjectRepository(TipoEntrada)
    private tipoEntradaRepository: Repository<TipoEntrada>,
  ) {}

  async seed() {
    await this.seedUbicaciones();
    await this.seedUsuarios();
    await this.seedEventos();
    await this.seedTiposEntrada();
  }

  private async seedUsuarios() {
    const usuarios = [
      {
        nombreCompleto: 'Juan Pérez',
        correoElectronico: 'juan.perez@email.com',
        telefono: '+34600123456',
        fechaNacimiento: new Date('1990-05-15')
      },
      {
        nombreCompleto: 'María González',
        correoElectronico: 'maria.gonzalez@email.com',
        telefono: '+34600789012',
        fechaNacimiento: new Date('1985-08-22')
      }
    ];

    for (const userData of usuarios) {
      const existeUsuario = await this.usuarioRepository.findOne({
        where: { correoElectronico: userData.correoElectronico }
      });

      if (!existeUsuario) {
        const usuario = this.usuarioRepository.create(userData);
        await this.usuarioRepository.save(usuario);
      }
    }
  }

  private async seedUbicaciones() {
    const ubicaciones = [
      {
        nombre: 'WiZink Center',
        direccion: 'Av. Felipe II, s/n',
        ciudad: 'Madrid',
        pais: 'España',
        codigoPostal: '28009',
        latitud: 40.4223,
        longitud: -3.6792,
        capacidad: 17000
      },
      {
        nombre: 'Palau de la Música Catalana',
        direccion: 'C/ Palau de la Música, 4-6',
        ciudad: 'Barcelona',
        pais: 'España',
        codigoPostal: '08003',
        latitud: 41.3874,
        longitud: 2.1686,
        capacidad: 2200
      }
    ];

    for (const ubicacionData of ubicaciones) {
      const existeUbicacion = await this.ubicacionRepository.findOne({
        where: { nombre: ubicacionData.nombre }
      });

      if (!existeUbicacion) {
        const ubicacion = this.ubicacionRepository.create(ubicacionData);
        await this.ubicacionRepository.save(ubicacion);
      }
    }
  }

  private async seedEventos() {
    const ubicaciones = await this.ubicacionRepository.find();
    
    const eventos = [
      {
        nombre: 'Concierto de Rock',
        descripcion: 'Increíble concierto de rock con las mejores bandas del momento',
        fechaEvento: new Date('2025-09-15'),
        horaInicio: '20:00',
        horaFin: '23:30',
        capacidadTotal: 15000,
        entradasDisponibles: 15000,
        imagenUrl: 'https://example.com/rock-concert.jpg',
        ubicacion: ubicaciones[0]
      },
      {
        nombre: 'Estreno de Película',
        descripcion: 'Estreno mundial de la nueva película de ciencia ficción',
        fechaEvento: new Date('2025-08-20'),
        horaInicio: '19:30',
        horaFin: '22:00',
        capacidadTotal: 2000,
        entradasDisponibles: 2000,
        imagenUrl: 'https://example.com/movie-premiere.jpg',
        ubicacion: ubicaciones[1]
      }
    ];

    for (const eventoData of eventos) {
      const existeEvento = await this.eventoRepository.findOne({
        where: { nombre: eventoData.nombre }
      });

      if (!existeEvento) {
        const evento = this.eventoRepository.create(eventoData);
        await this.eventoRepository.save(evento);
      }
    }
  }

  private async seedTiposEntrada() {
    const eventos = await this.eventoRepository.find();

    for (const evento of eventos) {
      const tiposEntrada = [
        {
          tipo: TipoEntradaEnum.GENERAL,
          nombre: 'Entrada General',
          descripcion: 'Acceso general al evento',
          precio: 50.00,
          cantidadDisponible: Math.floor(evento.capacidadTotal * 0.7),
          cantidadTotal: Math.floor(evento.capacidadTotal * 0.7),
          evento
        },
        {
          tipo: TipoEntradaEnum.VIP,
          nombre: 'Entrada VIP',
          descripcion: 'Acceso VIP con bebida incluida',
          precio: 100.00,
          cantidadDisponible: Math.floor(evento.capacidadTotal * 0.2),
          cantidadTotal: Math.floor(evento.capacidadTotal * 0.2),
          evento
        },
        {
          tipo: TipoEntradaEnum.PREMIUM,
          nombre: 'Entrada Premium',
          descripcion: 'Acceso premium con cena y bebida incluida',
          precio: 150.00,
          cantidadDisponible: Math.floor(evento.capacidadTotal * 0.1),
          cantidadTotal: Math.floor(evento.capacidadTotal * 0.1),
          evento
        }
      ];

      for (const tipoEntradaData of tiposEntrada) {
        const existeTipoEntrada = await this.tipoEntradaRepository.findOne({
          where: { 
            tipo: tipoEntradaData.tipo,
            evento: { id: evento.id }
          }
        });

        if (!existeTipoEntrada) {
          const tipoEntrada = this.tipoEntradaRepository.create(tipoEntradaData);
          await this.tipoEntradaRepository.save(tipoEntrada);
        }
      }
    }
  }
}
