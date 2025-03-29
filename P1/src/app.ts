// Interfaces
interface Cliente {
  id: number;
  nombre: string;
  correo: string;
}

interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  placa: string;
}

interface Reserva {
  id: number;
  cliente: Cliente;
  vehiculo: Vehiculo;
  fecha_inicio: Date;
  fecha_fin: Date;
}

// Variables y tipos
const cliente1: Cliente = { id: 1, nombre: "Ana", correo: "ana@mail.com" };
const cliente2: Cliente = { id: 2, nombre: "Luis", correo: "luis@mail.com" };

const vehiculo1: Vehiculo = { id: 1, marca: "Toyota", modelo: "Corolla", placa: "ABC123" };
const vehiculo2: Vehiculo = { id: 2, marca: "Honda", modelo: "Civic", placa: "XYZ789" };

// Arreglos de objetos
let clientes: Cliente[] = [cliente1, cliente2];
let vehiculos: Vehiculo[] = [vehiculo1, vehiculo2];
let reservas: Reserva[] = [];

// Función para crear una reserva (usa Spread y Rest)
function crearReserva(cliente: Cliente, vehiculo: Vehiculo, ...fechas: [Date, Date]): Reserva {
  const reserva: Reserva = {
    id: reservas.length + 1,
    cliente,
    vehiculo,
    fecha_inicio: fechas[0],
    fecha_fin: fechas[1],
  };
  reservas = [...reservas, reserva]; // Spread operator
  return reserva;
}

// Callback
function mostrarReservas(callback: (reserva: Reserva) => void) {
  reservas.forEach(callback);
}

// Promesa para simular guardar en "base de datos"
function guardarReserva(reserva: Reserva): Promise<Reserva> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(reserva), 500);
  });
}

// Async/Await
async function main() {
  const nuevaReserva = crearReserva(cliente1, vehiculo2, new Date(), new Date());
  const guardada = await guardarReserva(nuevaReserva);
  console.log("Reserva guardada:", guardada);

  mostrarReservas((res) => {
    console.log(`Reserva #${res.id}: ${res.cliente.nombre} - ${res.vehiculo.marca} ${res.vehiculo.modelo}`);
  });
}

main();