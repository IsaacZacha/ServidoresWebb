import { Calificaciones } from '../models/Calificaciones';
import { AppDataSource } from '../data-source';
import { Reserva } from '../models/Reserva';
import { Cliente } from '../models/Cliente';

export const InsertarCalificacion = async (
    puntuacion: number,
    comentario: string | null,
    fecha: Date,
    reservaId: number,
    clienteId: number
) => {
    const calificacion = new Calificaciones();
    calificacion.puntuacion = puntuacion;
    calificacion.comentario = comentario;
    calificacion.fecha = fecha;

    const reserva = await AppDataSource.manager.findOne(Reserva, { where: { id: reservaId } });
    const cliente = await AppDataSource.manager.findOne(Cliente, { where: { id: clienteId } });

    if (reserva && cliente) {
        calificacion.reserva = reserva;
        calificacion.cliente = cliente;

        return await AppDataSource.manager.save(calificacion);
    }
    return null;
};

export const ConsultarTodasCalificaciones = async () => {
    return await AppDataSource.manager.find(Calificaciones, {
        relations: ['reserva', 'cliente'],
    });
};

export const ActualizarCalificacion = async (
    id: number,
    puntuacion: number,
    comentario: string | null,
    fecha: Date,
    reservaId: number,
    clienteId: number
) => {
    const calificacion = await ConsultarCalificacionPorId(id);

    if (calificacion) {
        calificacion.puntuacion = puntuacion;
        calificacion.comentario = comentario;
        calificacion.fecha = fecha;

        const reserva = await AppDataSource.manager.findOne(Reserva, { where: { id: reservaId } });
        const cliente = await AppDataSource.manager.findOne(Cliente, { where: { id: clienteId } });

        if (reserva && cliente) {
            calificacion.reserva = reserva;
            calificacion.cliente = cliente;

            return await AppDataSource.manager.save(calificacion);
        }
    }
    return null;
};

export const ConsultarCalificacionPorId = async (id: number) => {
    return await AppDataSource.manager.findOne(Calificaciones, {
        where: { id },
        relations: ['reserva', 'cliente'],
    });

    
};
export const EliminarCalificacion = async (id: number) => {
    const calificacion = await ConsultarCalificacionPorId(id);

    if (calificacion) {
        return await AppDataSource.manager.remove(calificacion);
    }
    return null;
};

