# 🚗 API de Reservas de Vehículos

Este proyecto es una **API RESTful** desarrollada con [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/) y [SQLite](https://www.sqlite.org/), como parte de la práctica 1 de la asignatura *Aplicación para el Servidor Web*. Sistema completo para gestión de reservas de vehículos.

---

## 📚 Entidades implementadas

1. 👤 **Cliente** — Gestión de datos de clientes del sistema de reservas.
2. 🚗 **Vehículo** — Catálogo de vehículos disponibles para reserva.
3. 📅 **Reserva** — Sistema de reservas con relaciones entre clientes y vehículos.

---

## 🔗 Relaciones entre entidades

- **Cliente** 1:N **Reserva** — Un cliente puede tener múltiples reservas
- **Vehículo** 1:N **Reserva** — Un vehículo puede ser reservado múltiples veces
- **Reserva** N:1 **Cliente** — Cada reserva pertenece a un cliente
- **Reserva** N:1 **Vehículo** — Cada reserva está asociada a un vehículo

---

## ⚙️ Tecnologías utilizadas

- NestJS (TypeScript)
- TypeORM
- SQLite
- Class Validator / DTOs
- Postman para pruebas

---

## 🚀 Instalación y ejecución

1. **Clonar el repositorio:**

```bash
git clone https://github.com/IsaacZacha/ServidoresWebb.git
cd ServidoresWebb
```

2. **Instalar dependencias:**

```bash
npm install
```

3. **Ejecutar en modo desarrollo:**

```bash
npm run start:dev
```

4. **Compilar para producción:**

```bash
npm run build
npm run start:prod
```

---

## 📋 Endpoints disponibles

### 👤 Clientes
- `GET /clientes` — Obtener todos los clientes
- `GET /clientes/:id` — Obtener cliente por ID
- `POST /clientes` — Crear nuevo cliente
- `PATCH /clientes/:id` — Actualizar cliente
- `DELETE /clientes/:id` — Eliminar cliente

### 🚗 Vehículos
- `GET /vehiculos` — Obtener todos los vehículos
- `GET /vehiculos/disponibles` — Obtener vehículos disponibles
- `GET /vehiculos/:id` — Obtener vehículo por ID
- `POST /vehiculos` — Crear nuevo vehículo
- `PATCH /vehiculos/:id` — Actualizar vehículo
- `DELETE /vehiculos/:id` — Eliminar vehículo

### 📅 Reservas
- `GET /reservas` — Obtener todas las reservas
- `GET /reservas/:id` — Obtener reserva por ID
- `GET /reservas/cliente/:clienteId` — Obtener reservas de un cliente
- `GET /reservas/vehiculo/:vehiculoId` — Obtener reservas de un vehículo
- `POST /reservas` — Crear nueva reserva
- `PATCH /reservas/:id` — Actualizar reserva
- `PATCH /reservas/:id/confirmar` — Confirmar reserva
- `PATCH /reservas/:id/cancelar` — Cancelar reserva
- `DELETE /reservas/:id` — Eliminar reserva

---

## 🔧 Estructura del proyecto

```
src/
├── cliente/
│   ├── entities/
│   │   └── cliente.entity.ts
│   ├── dto/
│   │   ├── create-cliente.dto.ts
│   │   └── update-cliente.dto.ts
│   ├── cliente.controller.ts
│   ├── cliente.service.ts
│   └── cliente.module.ts
├── vehiculo/
│   ├── entities/
│   │   └── vehiculo.entity.ts
│   ├── dto/
│   │   ├── create-vehiculo.dto.ts
│   │   └── update-vehiculo.dto.ts
│   ├── vehiculo.controller.ts
│   ├── vehiculo.service.ts
│   └── vehiculo.module.ts
├── reserva/
│   ├── entities/
│   │   └── reserva.entity.ts
│   ├── dto/
│   │   ├── create-reserva.dto.ts
│   │   └── update-reserva.dto.ts
│   ├── reserva.controller.ts
│   ├── reserva.service.ts
│   └── reserva.module.ts
├── app.module.ts
└── main.ts
```

---

## 💾 Base de datos

El proyecto utiliza SQLite como base de datos, con las siguientes características:

- **Sincronización automática**: TypeORM sincroniza automáticamente las entidades
- **Archivo de BD**: `db.sqlite` en la raíz del proyecto
- **Relaciones**: Manejo completo de relaciones entre entidades

---

## 🧪 Pruebas con Postman

Para probar la API, puedes usar los siguientes ejemplos:

### Crear cliente
```json
POST /clientes
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan.perez@email.com",
  "telefono": "123456789",
  "direccion": "Calle 123",
  "documento_identidad": "12345678"
}
```

### Crear vehículo
```json
POST /vehiculos
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "placa": "ABC123",
  "tipo": "Sedán",
  "año": 2023,
  "color": "Blanco",
  "precio_por_dia": 50.00
}
```

### Crear reserva
```json
POST /reservas
{
  "cliente_id": 1,
  "vehiculo_id": 1,
  "fecha_inicio": "2025-07-10",
  "fecha_fin": "2025-07-15",
  "observaciones": "Reserva para vacaciones"
}
```

---

## 👨‍💻 Autor

**Isaac Zacha** - [GitHub](https://github.com/IsaacZacha)

---

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la asignatura *Aplicación para el Servidor Web*.

