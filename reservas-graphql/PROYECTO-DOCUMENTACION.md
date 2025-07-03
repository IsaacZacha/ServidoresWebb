# 🚗 Sistema de Reservas de Vehículos - GraphQL API

## 📋 Descripción del Proyecto

Este proyecto implementa una **API GraphQL funcional** para gestionar un sistema de reservas de vehículos. Está desarrollado con **NestJS** siguiendo una **arquitectura por capas** (Datos, Lógica de Negocio, API) y utiliza **TypeORM** para la persistencia de datos.

### 🎯 Objetivo de la Práctica

Diseñar, implementar y probar una API GraphQL funcional para gestionar tres entidades personalizadas, aplicando patrones de diseño y tecnologías modernas en el ecosistema de NestJS.

## 🏗️ Arquitectura del Sistema

### Entidades Implementadas

1. **Cliente** - Gestión de clientes del sistema
2. **Vehículo** - Catálogo de vehículos disponibles  
3. **Reserva** - Reservas realizadas por clientes

### Modelo de Datos

```
Cliente (1) ←→ (N) Reserva (N) ←→ (1) Vehiculo

Cliente:
- id, nombre, apellido, email, telefono, direccion, documento_identidad

Vehiculo:
- id, marca, modelo, placa, tipo, anio, color, estado, precio_por_dia

Reserva:
- id, cliente_id, vehiculo_id, fecha_inicio, fecha_fin, estado, 
  precio_total, fecha_creacion, observaciones
```

## 🛠️ Tecnologías Utilizadas

- **NestJS** - Framework Node.js
- **GraphQL** - API Query Language
- **Apollo Server** - Servidor GraphQL
- **TypeORM** - ORM para TypeScript
- **SQLite** - Base de datos
- **class-validator** - Validación de datos
- **class-transformer** - Transformación de objetos

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm

### Opción 1: Sandbox con Datos Precargados (Recomendado)

1. **Ejecutar sandbox completo**
   ```bash
   npm install
   npm run sandbox
   ```
   
   Esto instalará dependencias, cargará datos de ejemplo y iniciará el servidor.

2. **Acceder al GraphQL Playground**
   ```
   http://localhost:3000/graphql
   ```

3. **Probar con datos reales**
   - Ver `sandbox-consultas.md` para consultas preparadas
   - Datos incluidos: 3 clientes, 5 vehículos, 3 reservas

### Opción 2: Instalación Manual

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Cargar datos de ejemplo (opcional)**
   ```bash
   npm run seed
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run start:dev
   ```

4. **Acceder al GraphQL Playground**
   ```
   http://localhost:3000/graphql
   ```

## 🎮 Sandbox Interactivo

### ¿Qué incluye el Sandbox?

El sandbox precarga datos realistas para facilitar las pruebas:

#### 👥 Clientes (3 ejemplos)
- Juan Carlos Pérez García (CDMX)
- María Elena Rodríguez López (Guadalajara)  
- Carlos Eduardo Sánchez Martínez (Monterrey)

#### 🚗 Vehículos (5 ejemplos)
- Toyota Corolla 2022 - Disponible
- Honda Civic 2023 - Disponible
- Nissan Versa 2021 - Disponible
- Chevrolet Aveo 2020 - En mantenimiento
- Ford Fiesta 2023 - Disponible

#### 📅 Reservas (3 ejemplos)
- Reserva confirmada: Juan Carlos + Toyota Corolla
- Reserva pendiente: María Elena + Honda Civic
- Reserva confirmada: Carlos Eduardo + Ford Fiesta

### 🚀 Comandos del Sandbox

```bash
# Sandbox completo (instalar + seed + servidor)
npm run sandbox

# Solo cargar datos de ejemplo
npm run seed

# Solo iniciar servidor
npm run start:dev
```

### 📋 Consultas Preparadas

Ver archivo `sandbox-consultas.md` para:
- ✅ Consultas de verificación de datos
- ✅ Ejemplos de CRUD completos
- ✅ Casos de uso avanzados
- ✅ Consultas analíticas

## 🧪 Operaciones Disponibles

### **Clientes**
- `createCliente` - Crear nuevo cliente
- `clientes` - Listar todos los clientes
- `cliente(id)` - Obtener cliente por ID
- `updateCliente` - Actualizar cliente
- `removeCliente` - Eliminar cliente

### **Vehículos**
- `createVehiculo` - Crear nuevo vehículo
- `vehiculos` - Listar todos los vehículos
- `vehiculosDisponibles` - Listar vehículos disponibles
- `vehiculo(id)` - Obtener vehículo por ID
- `updateVehiculo` - Actualizar vehículo
- `removeVehiculo` - Eliminar vehículo

### **Reservas**
- `createReserva` - Crear nueva reserva
- `reservas` - Listar todas las reservas
- `reserva(id)` - Obtener reserva por ID
- `updateReserva` - Actualizar reserva
- `removeReserva` - Eliminar reserva

## ✅ Características Implementadas

### Validaciones
- ✅ Emails válidos
- ✅ Campos obligatorios
- ✅ Longitud mínima de strings
- ✅ Números positivos
- ✅ Estados válidos (enum)

### Relaciones
- ✅ Cliente tiene múltiples Reservas
- ✅ Vehículo tiene múltiples Reservas
- ✅ Reserva pertenece a un Cliente y un Vehículo

### Lógica de Negocio
- ✅ Cambio automático de estado del vehículo al reservar
- ✅ Liberación de vehículo al cancelar reserva
- ✅ Validación de existencia de cliente y vehículo al crear reserva

### GraphQL Features
- ✅ Queries para consultar datos
- ✅ Mutations para modificar datos
- ✅ Tipos complejos con relaciones
- ✅ Playground para pruebas interactivas

## 🔍 Verificación de Requisitos

### ✅ Cumplimiento de la Práctica

- **Tres entidades relacionadas**: Cliente, Vehículo, Reserva
- **Arquitectura por capas**: Entity, DTO, Service, Resolver
- **GraphQL code-first**: Implementado con decoradores
- **Operaciones CRUD completas**: Para todas las entidades
- **Validaciones**: Con class-validator
- **Base de datos**: SQLite con TypeORM
- **Documentación**: Descripciones en GraphQL
- **Pruebas**: Playground funcional

---

Ver `ejemplos-graphql.md` para ejemplos completos de consultas GraphQL.
