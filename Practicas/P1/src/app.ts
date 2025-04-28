// Variables
const sistemaNombre: string = "Sistema de Reservas";
let reservasRegistradas: number = 0;

// Importa tus entidades (ajusta la ruta y nombres según tu proyecto)
import { Cliente } from '../src/modelos/Cliente';
import { Vehiculo } from '../src/modelos/Vehiculo';
import { Reserva } from '../src/modelos/Reserva';




// Objetos Literales (instancias de entidades)sss
const clienteEjemplo = new Cliente();
clienteEjemplo.id = 1;
clienteEjemplo.nombre = "Juan Pérez";
clienteEjemplo.email = "juan@example.com";

const vehiculoEjemplo = new Vehiculo();
vehiculoEjemplo.id = 1;
vehiculoEjemplo.modelo = "Toyota Corolla";
vehiculoEjemplo.placa = "ABC-123";

const reservaInicial = new Reserva();
reservaInicial.id = 1;
reservaInicial.cliente = clienteEjemplo;
reservaInicial.vehiculo = vehiculoEjemplo;
reservaInicial.fecha_inicio = "2025-06-10";
reservaInicial.fecha_fin = "2025-06-15";

// Arreglos
const clientes: Cliente[] = [clienteEjemplo];
const vehiculos: Vehiculo[] = [vehiculoEjemplo];
const reservas: Reserva[] = [reservaInicial];

// Funciones Básicas
function crearReserva(id: number, cliente: Cliente, vehiculo: Vehiculo, fecha_inicio: string, fecha_fin: string): Reserva {
    const reserva = new Reserva();
    reserva.id = id;
    reserva.cliente = cliente;
    reserva.vehiculo = vehiculo;
    reserva.fecha_inicio = fecha_inicio;
    reserva.fecha_fin = fecha_fin;
    return reserva;
}

function mostrarReservas(listaReservas: Reserva[]): void {
    listaReservas.forEach(r =>
        console.log(`[${r.fecha_inicio} - ${r.fecha_fin}] ${r.cliente.nombre} reservó ${r.vehiculo.modelo}`)
    );
}

// Spread/Rest
const nuevasReservas: Reserva[] = [
    ...reservas,
    crearReserva(2, clienteEjemplo, vehiculoEjemplo, "2025-07-01", "2025-07-05")
];

function registrarReservas(...reservasNuevas: Reserva[]): void {
    reservas.push(...reservasNuevas);
    reservasRegistradas += reservasNuevas.length;
}

// Callbacks
function procesarReserva(reserva: Reserva, callback: (r: Reserva) => void): void {
    callback(reserva);
}

procesarReserva(reservaInicial, (r) => {
    console.log(`Procesada: Reserva de ${r.cliente.nombre}`);
});

// Promises
function guardarReserva(reserva: Reserva): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Reserva #${reserva.id} guardada`);
        }, 1000);
    });
}



// Async/Awaitt
async function flujoPrincipal(): Promise<void> {
    const nuevaReserva = crearReserva(3, clienteEjemplo, vehiculoEjemplo, "2025-08-01", "2025-08-10");
    const resultado = await guardarReserva(nuevaReserva);
    console.log(resultado);
}