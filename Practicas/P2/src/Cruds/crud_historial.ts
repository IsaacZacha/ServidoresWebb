import { Historial_estado } from '../models/Historial_estado';
import { AppDataSource } from '../data-source';
import { Reserva } from '../models/Reserva';

export const InsertarHistorialEstado = async (
  reservaId: number,
  estado: string,
  fecha_cambio: Date,
  cambiado_por: string,
  observaciones?: string
) => {
  const reserva = await AppDataSource.manager.findOne(Reserva, {
    where: { id: reservaId }
  });

  if (!reserva) return null;

  const historial = new Historial_estado();
  historial.reserva = reserva;
  historial.estado = estado;
  historial.fecha_cambio = fecha_cambio;
  historial.cambiado_por = cambiado_por;
  historial.observaciones = observaciones;

  return await AppDataSource.manager.save(historial);
};
export const ConsultarTodosHistoriales = async () => {
  return await AppDataSource.manager.find(Historial_estado, {
    relations: ['reserva']
  });
};
export const ConsultarHistorialPorId = async (id: number) => {
  return await AppDataSource.manager.findOne(Historial_estado, {
    where: { id },
    relations: ['reserva']
  });
};
export const ActualizarHistorial = async (
  id: number,
  estado: string,
  fecha_cambio: Date,
  cambiado_por: string,
  observaciones?: string
) => {
  const historial = await ConsultarHistorialPorId(id);
  if (!historial) return null;

  historial.estado = estado;
  historial.fecha_cambio = fecha_cambio;
  historial.cambiado_por = cambiado_por;
  historial.observaciones = observaciones;

  return await AppDataSource.manager.save(historial);
};
export const EliminarHistorial = async (id: number) => {
  const historial = await ConsultarHistorialPorId(id);
  if (!historial) return null;

  return await AppDataSource.manager.remove(historial);
};
