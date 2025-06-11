import { Extensiones_reserva } from '../models/Extenciones_reserva';
import { AppDataSource } from '../data-source';
import { Reserva } from '../models/Reserva';

export const InsertarExtension = async (
  reservaId: number,
  fecha_solicitud: Date,
  nueva_fecha_devolucion: Date,
  estado: string,
  motivo?: string
) => {
  const reserva = await AppDataSource.manager.findOne(Reserva, {
    where: { id: reservaId }
  });

  if (!reserva) return null;

  const extension = new Extensiones_reserva();
  extension.reserva = reserva;
  extension.fecha_solicitud = fecha_solicitud;
  extension.nueva_fecha_devolucion = nueva_fecha_devolucion;
  extension.estado = estado;
  extension.motivo = motivo;

  return await AppDataSource.manager.save(extension);
};
export const ConsultarTodasExtensiones = async () => {
  return await AppDataSource.manager.find(Extensiones_reserva, {
    relations: ['reserva']
  });
};
export const ConsultarExtensionPorId = async (id: number) => {
  return await AppDataSource.manager.findOne(Extensiones_reserva, {
    where: { id },
    relations: ['reserva']
  });
};
export const ActualizarExtension = async (
  id: number,
  nueva_fecha_devolucion: Date,
  estado: string,
  motivo?: string
) => {
  const extension = await ConsultarExtensionPorId(id);
  if (!extension) return null;

  extension.nueva_fecha_devolucion = nueva_fecha_devolucion;
  extension.estado = estado;
  extension.motivo = motivo;

  return await AppDataSource.manager.save(extension);
};
export const EliminarExtension = async (id: number) => {
  const extension = await ConsultarExtensionPorId(id);
  if (!extension) return null;

  return await AppDataSource.manager.remove(extension);
};
