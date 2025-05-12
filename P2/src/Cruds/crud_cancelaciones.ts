import { Cancelaciones } from '../models/Cancelaciones';
import { Reserva } from '../models/Reserva';
import { AppDataSource } from '../data-source';

export const InsertarCancelacion = async (
  reservaId: number,
  fecha_cancelacion: Date,
  motivo: string,
  tipo_cancelacion: string, // "cliente" o "empresa"
  cargo_cancelacion: number
) => {
  const reserva = await AppDataSource.manager.findOne(Reserva, { where: { id: reservaId } });

  if (!reserva) return null;

  const cancelacion = new Cancelaciones();
  cancelacion.reserva = reserva;
  cancelacion.fecha_cancelacion = fecha_cancelacion;
  cancelacion.motivo = motivo;
  cancelacion.tipo_cancelacion = tipo_cancelacion;
  cancelacion.cargo_cancelacion = cargo_cancelacion;

  return await AppDataSource.manager.save(cancelacion);
};
export const ConsultarTodasCancelaciones = async () => {
  return await AppDataSource.manager.find(Cancelaciones, {
    relations: ['reserva'],
  });
};
export const ConsultarCancelacionPorId = async (id: number) => {
  return await AppDataSource.manager.findOne(Cancelaciones, {
    where: { id },
    relations: ['reserva'],
  });
};
export const ActualizarCancelacion = async (
  id: number,
  fecha_cancelacion: Date,
  motivo: string,
  tipo_cancelacion: string,
  cargo_cancelacion: number,
  reservaId: number
) => {
  const cancelacion = await ConsultarCancelacionPorId(id);
  const reserva = await AppDataSource.manager.findOne(Reserva, { where: { id: reservaId } });

  if (cancelacion && reserva) {
    cancelacion.fecha_cancelacion = fecha_cancelacion;
    cancelacion.motivo = motivo;
    cancelacion.tipo_cancelacion = tipo_cancelacion;
    cancelacion.cargo_cancelacion = cargo_cancelacion;
    cancelacion.reserva = reserva;

    return await AppDataSource.manager.save(cancelacion);
  }

  return null;
};
export const EliminarCancelacion = async (id: number) => {
  const cancelacion = await ConsultarCancelacionPorId(id);
  if (cancelacion) {
    return await AppDataSource.manager.remove(cancelacion);
  }
  return null;


  
};
