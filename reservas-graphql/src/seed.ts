import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClienteService } from './cliente/cliente.service';
import { VehiculoService } from './vehiculo/vehiculo.service';
import { ReservaService } from './reserva/reserva.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const clienteService = app.get(ClienteService);
  const vehiculoService = app.get(VehiculoService);
  const reservaService = app.get(ReservaService);

  console.log('🌱 Iniciando seed de datos...');

  try {
    // Verificar si ya existen datos
    const clientesExistentes = await clienteService.findAll();
    const vehiculosExistentes = await vehiculoService.findAll();
    const reservasExistentes = await reservaService.findAll();

    if (clientesExistentes.length > 0 || vehiculosExistentes.length > 0 || reservasExistentes.length > 0) {
      console.log('✅ Los datos del sandbox ya existen!');
      console.log('📊 Datos encontrados:');
      console.log(`   - ${clientesExistentes.length} Clientes`);
      console.log(`   - ${vehiculosExistentes.length} Vehículos`);
      console.log(`   - ${reservasExistentes.length} Reservas`);
      console.log('🚀 GraphQL Playground: http://localhost:3000/graphql');
      console.log('');
      console.log('💡 Para resetear los datos, elimina el archivo "reservas.db" y ejecuta el seed nuevamente');
      await app.close();
      return;
    }

    // Crear clientes de ejemplo
    const cliente1 = await clienteService.create({
      nombre: 'Juan Carlos',
      apellido: 'Pérez García',
      email: 'juan.perez@email.com',
      telefono: '+52 55 1234 5678',
      direccion: 'Av. Reforma 123, Col. Centro, CDMX',
      documento_identidad: 'PEGJ850315HDFRZN09'
    });

    const cliente2 = await clienteService.create({
      nombre: 'María Elena',
      apellido: 'Rodríguez López',
      email: 'maria.rodriguez@email.com',
      telefono: '+52 33 9876 5432',
      direccion: 'Calle Revolución 456, Guadalajara, JAL',
      documento_identidad: 'ROLM900822MJCRPN02'
    });

    const cliente3 = await clienteService.create({
      nombre: 'Carlos Eduardo',
      apellido: 'Sánchez Martínez',
      email: 'carlos.sanchez@email.com',
      telefono: '+52 81 5555 7777',
      direccion: 'Blvd. Díaz Ordaz 789, Monterrey, NL'
    });

    console.log('✅ Clientes creados:', cliente1.id, cliente2.id, cliente3.id);

    // Crear vehículos de ejemplo
    const vehiculo1 = await vehiculoService.create({
      marca: 'Toyota',
      modelo: 'Corolla',
      placa: 'ABC-123-DEF',
      tipo: 'Sedán',
      anio: 2022,
      color: 'Blanco',
      estado: 'disponible',
      precio_por_dia: 450.00
    });

    const vehiculo2 = await vehiculoService.create({
      marca: 'Honda',
      modelo: 'Civic',
      placa: 'XYZ-789-GHI',
      tipo: 'Sedán',
      anio: 2023,
      color: 'Azul',
      estado: 'disponible',
      precio_por_dia: 500.00
    });

    const vehiculo3 = await vehiculoService.create({
      marca: 'Nissan',
      modelo: 'Versa',
      placa: 'JKL-456-MNO',
      tipo: 'Hatchback',
      anio: 2021,
      color: 'Rojo',
      estado: 'disponible',
      precio_por_dia: 400.00
    });

    const vehiculo4 = await vehiculoService.create({
      marca: 'Chevrolet',
      modelo: 'Aveo',
      placa: 'PQR-321-STU',
      tipo: 'Sedán',
      anio: 2020,
      color: 'Negro',
      estado: 'mantenimiento',
      precio_por_dia: 350.00
    });

    const vehiculo5 = await vehiculoService.create({
      marca: 'Ford',
      modelo: 'Fiesta',
      placa: 'VWX-654-YZA',
      tipo: 'Hatchback',
      anio: 2023,
      color: 'Gris',
      estado: 'disponible',
      precio_por_dia: 420.00
    });

    console.log('✅ Vehículos creados:', vehiculo1.id, vehiculo2.id, vehiculo3.id, vehiculo4.id, vehiculo5.id);

    // Crear reservas de ejemplo
    const reserva1 = await reservaService.create({
      clienteId: cliente1.id,
      vehiculoId: vehiculo1.id,
      fecha_inicio: '2025-07-15T10:00:00.000Z',
      fecha_fin: '2025-07-20T10:00:00.000Z',
      estado: 'confirmada',
      precio_total: 2250.00,
      observaciones: 'Reserva para viaje de negocios'
    });

    const reserva2 = await reservaService.create({
      clienteId: cliente2.id,
      vehiculoId: vehiculo2.id,
      fecha_inicio: '2025-07-25T14:00:00.000Z',
      fecha_fin: '2025-07-30T14:00:00.000Z',
      estado: 'pendiente',
      precio_total: 2500.00,
      observaciones: 'Reserva para vacaciones familiares'
    });

    const reserva3 = await reservaService.create({
      clienteId: cliente3.id,
      vehiculoId: vehiculo5.id,
      fecha_inicio: '2025-08-01T09:00:00.000Z',
      fecha_fin: '2025-08-03T18:00:00.000Z',
      estado: 'confirmada',
      precio_total: 840.00,
      observaciones: 'Fin de semana largo'
    });

    console.log('✅ Reservas creadas:', reserva1.id, reserva2.id, reserva3.id);

    console.log('🎉 Seed completado exitosamente!');
    console.log('📊 Datos creados:');
    console.log(`   - ${3} Clientes`);
    console.log(`   - ${5} Vehículos`);
    console.log(`   - ${3} Reservas`);
    console.log('🚀 GraphQL Playground: http://localhost:3000/graphql');

  } catch (error) {
    console.error('❌ Error durante el seed:', error);
  }

  await app.close();
}

seed();
