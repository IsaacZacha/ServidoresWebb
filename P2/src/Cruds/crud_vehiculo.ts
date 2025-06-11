import { AppDataSource } from '../data-source';
import { Vehiculo } from '../models/Vehiculo';

export const InsertarVehiculo = async (
  marca: string,
  modelo: string,
  placa: string,
  tipo: string
) => {
  const vehiculo = new Vehiculo();
  vehiculo.marca = marca;
  vehiculo.modelo = modelo;
  vehiculo.placa = placa;
  vehiculo.tipo = tipo;

  return await AppDataSource.manager.save(vehiculo);
};

export const ConsultarTodosLosVehiculos = async () => {
  return await AppDataSource.manager.find(Vehiculo, {
    relations: ['reservas'],
  });
};
export const ConsultarVehiculoPorId = async (id: number) => {
  return await AppDataSource.manager.findOne(Vehiculo, {
    where: { id },
    relations: ['reservas'],
  });
};
export const ActualizarVehiculo = async (
  id: number,
  marca: string,
  modelo: string,
  placa: string,
  tipo: string
) => {
  const vehiculo = await ConsultarVehiculoPorId(id);
  if (!vehiculo) return null;

  vehiculo.marca = marca;
  vehiculo.modelo = modelo;
  vehiculo.placa = placa;
  vehiculo.tipo = tipo;

  return await AppDataSource.manager.save(vehiculo);
};
export const EliminarVehiculo = async (id: number) => {
  const vehiculo = await ConsultarVehiculoPorId(id);
  if (!vehiculo) return null;

  return await AppDataSource.manager.remove(vehiculo);
};