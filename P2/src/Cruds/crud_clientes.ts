import { Cliente } from '../models/Cliente';
import { AppDataSource } from '../data-source';

export const InsertarCliente = async (
  nombre: string,
  correo: string
) => {
  const cliente = new Cliente();
  cliente.nombre = nombre;
  cliente.correo = correo;

  return await AppDataSource.manager.save(cliente);
};
export const ConsultarTodosClientes = async () => {
  return await AppDataSource.manager.find(Cliente, {
    relations: ['reservas', 'calificaciones']
  });
};
export const ConsultarClientePorId = async (id: number) => {
  return await AppDataSource.manager.findOne(Cliente, {
    where: { id },
    relations: ['reservas', 'calificaciones']
  });
};
export const ActualizarCliente = async (
  id: number,
  nombre: string,
  correo: string
) => {
  const cliente = await ConsultarClientePorId(id);
  if (cliente) {
    cliente.nombre = nombre;
    cliente.correo = correo;

    return await AppDataSource.manager.save(cliente);
  }
  return null;
};
export const EliminarCliente = async (id: number) => {
  const cliente = await ConsultarClientePorId(id);
  if (cliente) {
    return await AppDataSource.manager.remove(cliente);
  }
  return null;
};
