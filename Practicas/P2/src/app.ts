import { iniciar } from './database';
import {
  InsertarCliente, ConsultarClientePorId, ActualizarCliente, ConsultarTodosClientes, EliminarCliente} from '../src/Cruds/crud_clientes';
import {
  InsertarVehiculo, EliminarVehiculo, ConsultarVehiculoPorId, ActualizarVehiculo, ConsultarTodosLosVehiculos} from './Cruds/crud_vehiculo';
import {
  EliminarReserva, InsertarReserva, ActualizarReserva, ConsultarReservaPorId, ConsultarTodasLasReservas} from './Cruds/crud_reserva';
import {
  InsertarCalificacion, EliminarCalificacion, ConsultarCalificacionPorId, ActualizarCalificacion, ConsultarTodasCalificaciones} from './Cruds/crud_calificaciones';
import {
  InsertarCancelacion, EliminarCancelacion, ConsultarCancelacionPorId, ActualizarCancelacion, ConsultarTodasCancelaciones} from './Cruds/crud_cancelaciones';
import {
  InsertarHistorialEstado, EliminarHistorial, ConsultarHistorialPorId, ActualizarHistorial, ConsultarTodosHistoriales} from './Cruds/crud_historial';
import {
  InsertarIncidente, EliminarIncidente, ConsultarIncidentePorId, ActualizarIncidente, ConsultarTodosIncidentes} from './Cruds/crud_incidente';
import {
  InsertarExtension, EliminarExtension, ConsultarExtensionPorId, ActualizarExtension, ConsultarTodasExtensiones} from './Cruds/crud_extenciones';

async function main() {
  await iniciar();

  // Cliente
  const cliente = await InsertarCliente("Pedro Pérez", "pedro@example.com");
  console.log("Cliente creado:", cliente);

  // Vehículo
  const vehiculo = await InsertarVehiculo("Toyota", "Corolla", "ABC123", "Sedan");
  console.log("Vehículo creado:", vehiculo);

  // Reservaa
  const reserva = await InsertarReserva(cliente.id, vehiculo.id, new Date("2025-06-01"), new Date("2025-06-10"), "pendiente", 500.00);
  console.log("Reserva creada:", reserva);

  // Cancelación
  const cancelacion = await InsertarCancelacion(reserva!.id, new Date(), "Cambio de planes", "cliente", 50.00);
  console.log("Cancelación registrada:", cancelacion);

  // Historial de estado
  const historial = await InsertarHistorialEstado(reserva!.id, "activa", new Date(), "sistema", "Reserva activada automáticamente");
  console.log("Historial de estado creado:", historial);

  // Incidente
  const incidente = await InsertarIncidente(reserva!.id, new Date(), "Pinchazo en una rueda", "daño", "cliente", 30.00, false);
  console.log("Incidente registrado:", incidente);

  // Extensión de reserva
  const extension = await InsertarExtension(reserva!.id, new Date(), new Date("2025-06-12"), "pendiente", "Cliente solicita 2 días más");
  console.log("Extensión de reserva creada:", extension);

  // Consultas generales
  console.log("Todos los clientes:", await ConsultarTodosClientes());
  console.log("Todos los vehículos:", await ConsultarTodosLosVehiculos());
  console.log("Todas las reservas:", await ConsultarTodasLasReservas());
  console.log("Todas las calificaciones:", await ConsultarTodasCalificaciones());
  console.log("Todas las cancelaciones:", await ConsultarTodasCancelaciones());
  console.log("Todos los historiales de estado:", await ConsultarTodosHistoriales());
  console.log("Todos los incidentes:", await ConsultarTodosIncidentes());
  console.log("Todas las extensiones de reserva:", await ConsultarTodasExtensiones());

  // Consultas por ID
  console.log("Consulta de Cliente por ID:", await ConsultarClientePorId(cliente.id));
  console.log("Consulta de Vehículo por ID:", await ConsultarVehiculoPorId(vehiculo.id));
  console.log("Consulta de Reserva por ID:", await ConsultarReservaPorId(reserva!.id));
  console.log("Consulta de Cancelación por ID:", await ConsultarCancelacionPorId(cancelacion!.id));
  console.log("Consulta de Historial por ID:", await ConsultarHistorialPorId(historial!.id));
  console.log("Consulta de Incidente por ID:", await ConsultarIncidentePorId(incidente!.id));
  console.log("Consulta de Extensión por ID:", await ConsultarExtensionPorId(extension!.id));

  // Actualización de entidad
  const clienteActualizado = await ActualizarCliente(cliente.id, "Pedro", "Pérez");
  console.log("Cliente actualizado:", clienteActualizado);

  const vehiculoActualizado = await ActualizarVehiculo(vehiculo.id, "Toyota", "Corolla", "XYZ987", "SUV");
  console.log("Vehículo actualizado:", vehiculoActualizado);

  const reservaActualizada = await ActualizarReserva(reserva!.id, new Date("2025-06-03"), new Date("2025-06-15"), "activa", 550.00);
  console.log("Reserva actualizada:", reservaActualizada);

  // Eliminación de entidades
  await EliminarReserva(reserva!.id);
  console.log("Reserva eliminada.");

  await EliminarVehiculo(vehiculo.id);
  console.log("Vehículo eliminado.");

  await EliminarCliente(cliente.id);
  console.log("Cliente eliminado.");

  await EliminarCancelacion(cancelacion!.id);
  console.log("Cancelación eliminada.");

  await EliminarHistorial(historial!.id);
  console.log("Historial de estado eliminado.");

  await EliminarIncidente(incidente!.id);
  console.log("Incidente eliminado.");

  await EliminarExtension(extension!.id);
  console.log("Extensión de reserva eliminada.");
}

main();
