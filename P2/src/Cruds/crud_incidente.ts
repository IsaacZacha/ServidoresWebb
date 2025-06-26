import { AppDataSource } from '../data-source';
import { Incidentes } from '../models/Incidente';
import { Reserva } from '../models/Reserva';

export const InsertarIncidente = async (
  reservaId: number,
  fecha_incidente: Date,
  descripcion: string,
  tipo: string,
  responsable: string,
  costo_estimado?: number,
  resuelto: boolean = false
) => {
  const reserva = await AppDataSource.manager.findOne(Reserva, {
    where: { id: reservaId }
  });

  if (!reserva) return null;

  const incidente = new Incidentes();
  incidente.reserva = reserva;
  incidente.fecha_incidente = fecha_incidente;
  incidente.descripcion = descripcion;
  incidente.tipo = tipo;
  incidente.responsable = responsable;
  incidente.costo_estimado = costo_estimado;
  incidente.resuelto = resuelto;

  return await AppDataSource.manager.save(incidente);
};
export const ConsultarTodosIncidentes = async () => {
  return await AppDataSource.manager.find(Incidentes, {
    relations: ['reserva']
  });
};
export const ConsultarIncidentePorId = async (id: number) => {
  return await AppDataSource.manager.findOne(Incidentes, {
    where: { id },
    relations: ['reserva']
  });
};
export const ActualizarIncidente = async (
  id: number,
  fecha_incidente: Date,
  descripcion: string,
  tipo: string,
  responsable: string,
  costo_estimado?: number,
  resuelto: boolean = false
) => {
  const incidente = await ConsultarIncidentePorId(id);
  if (!incidente) return null;

  incidente.fecha_incidente = fecha_incidente;
  incidente.descripcion = descripcion;
  incidente.tipo = tipo;
  incidente.responsable = responsable;
  incidente.costo_estimado = costo_estimado;
  incidente.resuelto = resuelto;

  return await AppDataSource.manager.save(incidente);
};
export const EliminarIncidente = async (id: number) => {
  const incidente = await ConsultarIncidentePorId(id);
  if (!incidente) return null;

  return await AppDataSource.manager.remove(incidente);
};
