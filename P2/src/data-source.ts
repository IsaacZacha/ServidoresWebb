import "reflect-metadata";
import { DataSource } from "typeorm";

import { Reserva } from "../src/models/Reserva";
import { Cliente } from "../src/models/Cliente";
import { Vehiculo } from "../src/models/Vehiculo";
import { Extensiones_reserva } from "../src/models/Extenciones_reserva";
import { Cancelaciones } from "../src/models/Cancelaciones";
import { Calificaciones } from "../src/models/Calificaciones";
import { Incidentes } from "../src/models/Incidente";
import { Historial_estado } from "../src/models/Historial_estado";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "111111",
  database: process.env.DB_NAME || "car_rental_db",
  synchronize: true, 
  logging: false,
  entities: [
    Reserva,
    Cliente,
    Vehiculo,
    Extensiones_reserva,
    Cancelaciones,
    Calificaciones,
    Incidentes,
    Historial_estado
  ],
  migrations: [],
  subscribers: []
});
