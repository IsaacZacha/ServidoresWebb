import { AppDataSource } from '../data-source';
import { Reserva } from '../models/Reserva';
import { Cliente } from '../models/Cliente';
import { Vehiculo } from '../models/Vehiculo';

export const InsertarReserva = async (
  clienteId: number,
  vehiculoId: number,
  fecha_inicio: Date,
  fecha_fin: Date,
  estado: string,
  precio_total: number
) => {
  const cliente = await AppDataSource.manager.findOne(Cliente, { where: { id: clienteId } });
  const vehiculo = await AppDataSource.manager.findOne(Vehiculo, { where: { id: vehiculoId } });

  if (!cliente || !vehiculo) return null;

  const reserva = new Reserva();
  reserva.cliente = cliente;
  reserva.vehiculo = vehiculo;
  reserva.fecha_inicio = fecha_inicio;
  reserva.fecha_fin = fecha_fin;
  reserva.estado = estado;
  reserva.precio_total = precio_total;

  return await AppDataSource.manager.save(reserva);
};
export const ConsultarTodasLasReservas = async () => {
  return await AppDataSource.manager.find(Reserva, {
    relations: [
      'cliente',
      'vehiculo',
      'extensiones',
      'cancelaciones',
      'calificaciones',
      'incidentes',
      'historial_estado'
    ]
  });
};
export const ConsultarReservaPorId = async (id: number) => {
  return await AppDataSource.manager.findOne(Reserva, {
    where: { id },
    relations: [
      'cliente',
      'vehiculo',
      'extensiones',
      'cancelaciones',
      'calificaciones',
      'incidentes',
      'historial_estado'
    ]
  });
};
export const ActualizarReserva = async (
  id: number,
  fecha_inicio: Date,
  fecha_fin: Date,
  estado: string,
  precio_total: number
) => {
  const reserva = await ConsultarReservaPorId(id);
  if (!reserva) return null;

  reserva.fecha_inicio = fecha_inicio;
  reserva.fecha_fin = fecha_fin;
  reserva.estado = estado;
  reserva.precio_total = precio_total;

  return await AppDataSource.manager.save(reserva);
};
export const EliminarReserva = async (id: number) => {
  const reserva = await ConsultarReservaPorId(id);
  if (!reserva) return null;

  return await AppDataSource.manager.remove(reserva);
};
