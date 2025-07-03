# Sistema de Reservas de Vehículos - GraphQL API

## Descripción del Proyecto

Este proyecto implementa una API GraphQL completa para la gestión de reservas de vehículos utilizando NestJS, TypeORM y SQLite. El sistema maneja tres entidades principales: **Cliente**, **Vehículo** y **Reserva**.

## Modelo de Datos

### Entidades

1. **Cliente**
   - `id`: number (Primary Key)
   - `nombre`: string (required)
   - `apellido`: string (required) 
   - `email`: string (unique, required)
   - `telefono`: string (required)
   - `direccion`: string (optional)
   - `documento_identidad`: string (optional)
   - `reservas`: Reserva[] (relación One-to-Many)

2. **Vehículo**
   - `id`: number (Primary Key)
   - `marca`: string (required)
   - `modelo`: string (required)
   - `placa`: string (unique, required)
   - `tipo`: string (required)
   - `año`: number (required, min: 1900)
   - `color`: string (required)
   - `estado`: string (disponible|reservado|mantenimiento)
   - `precio_por_dia`: number (required, positive)
   - `reservas`: Reserva[] (relación One-to-Many)

3. **Reserva**
   - `id`: number (Primary Key)
   - `cliente`: Cliente (relación Many-to-One)
   - `vehiculo`: Vehículo (relación Many-to-One)
   - `fecha_inicio`: Date (required)
   - `fecha_fin`: Date (required)
   - `estado`: string (pendiente|confirmada|cancelada|completada)
   - `precio_total`: number (required, positive)
   - `fecha_creacion`: Date (auto-generated)
   - `observaciones`: string (optional)

## Arquitectura por Capas

### 1. Capa de Datos (Entities)
- Definición de las estructuras de base de datos con TypeORM
- Decoradores `@Entity`, `@Column`, `@PrimaryGeneratedColumn`
- Relaciones entre entidades (`@OneToMany`, `@ManyToOne`)
- Exposición a GraphQL con `@ObjectType` y `@Field`

### 2. Capa de Transferencia (DTOs)
- `CreateXXXInput`: Validación de datos de entrada para creación
- `UpdateXXXInput`: Validación de datos de entrada para actualización
- Validadores de `class-validator`: `@IsString`, `@IsEmail`, `@IsNotEmpty`, etc.

### 3. Capa de Lógica de Negocio (Services)
- Implementación de operaciones CRUD
- Validaciones de negocio
- Interacción con repositorios de TypeORM
- Manejo de relaciones entre entidades

### 4. Capa de API (Resolvers)
- Exposición de funcionalidad a través de GraphQL
- `@Query`: Para consultas de datos
- `@Mutation`: Para creación, actualización y eliminación
- Documentación de operaciones con `description`

## Instalación y Configuración

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run start:dev

# Iniciar en modo producción
npm run start:prod
```

## GraphQL Playground

Una vez iniciada la aplicación, el GraphQL Playground estará disponible en:
**http://localhost:3000/graphql**

## Operaciones Disponibles

### Queries (Consultas)

```graphql
# Obtener todos los clientes
query {
  clientes {
    id
    nombre
    apellido
    email
    telefono
    reservas {
      id
      estado
      fecha_inicio
      fecha_fin
    }
  }
}

# Obtener un cliente específico
query {
  cliente(id: 1) {
    id
    nombre
    apellido
    email
    reservas {
      id
      vehiculo {
        marca
        modelo
        placa
      }
    }
  }
}

# Obtener todos los vehículos
query {
  vehiculos {
    id
    marca
    modelo
    placa
    tipo
    año
    color
    estado
    precio_por_dia
  }
}

# Obtener vehículos disponibles
query {
  vehiculosDisponibles {
    id
    marca
    modelo
    placa
    precio_por_dia
  }
}

# Obtener todas las reservas
query {
  reservas {
    id
    cliente {
      nombre
      apellido
    }
    vehiculo {
      marca
      modelo
      placa
    }
    fecha_inicio
    fecha_fin
    estado
    precio_total
  }
}
```

### Mutations (Operaciones de modificación)

```graphql
# Crear un nuevo cliente
mutation {
  createCliente(createClienteInput: {
    nombre: "Juan"
    apellido: "Pérez"
    email: "juan.perez@email.com"
    telefono: "555-1234"
    direccion: "Calle Principal 123"
    documento_identidad: "12345678"
  }) {
    id
    nombre
    apellido
    email
  }
}

# Crear un nuevo vehículo
mutation {
  createVehiculo(createVehiculoInput: {
    marca: "Toyota"
    modelo: "Corolla"
    placa: "ABC-123"
    tipo: "Sedán"
    año: 2022
    color: "Blanco"
    estado: "disponible"
    precio_por_dia: 50.00
  }) {
    id
    marca
    modelo
    placa
    estado
  }
}

# Crear una nueva reserva
mutation {
  createReserva(createReservaInput: {
    clienteId: 1
    vehiculoId: 1
    fecha_inicio: "2024-01-15"
    fecha_fin: "2024-01-20"
    estado: "pendiente"
    precio_total: 250.00
    observaciones: "Viaje de negocios"
  }) {
    id
    cliente {
      nombre
      apellido
    }
    vehiculo {
      marca
      modelo
    }
    fecha_inicio
    fecha_fin
    precio_total
  }
}

# Actualizar un cliente
mutation {
  updateCliente(updateClienteInput: {
    id: 1
    telefono: "555-9999"
    direccion: "Nueva dirección 456"
  }) {
    id
    nombre
    telefono
    direccion
  }
}

# Eliminar una reserva
mutation {
  removeReserva(id: 1) {
    id
    estado
  }
}
```

## Validaciones Implementadas

### Cliente
- Nombre y apellido: mínimo 2 caracteres
- Email: formato válido y único
- Teléfono: requerido

### Vehículo
- Marca, modelo, tipo, color: requeridos
- Placa: única en el sistema
- Año: mínimo 1900
- Estado: solo valores permitidos (disponible, reservado, mantenimiento)
- Precio por día: número positivo

### Reserva
- Cliente y vehículo: deben existir en el sistema
- Fechas: formato válido
- Estado: solo valores permitidos
- Precio total: número positivo
- Lógica de negocio: el vehículo debe estar disponible

## Características Técnicas

- **Framework**: NestJS 10
- **GraphQL**: Apollo Server
- **ORM**: TypeORM
- **Base de datos**: SQLite (archivo: reservas.db)
- **Validación**: class-validator
- **Transformación**: class-transformer

## Estructura del Proyecto

```
src/
├── cliente/
│   ├── dto/
│   │   ├── create-cliente.input.ts
│   │   └── update-cliente.input.ts
│   ├── entities/
│   │   └── cliente.entity.ts
│   ├── cliente.module.ts
│   ├── cliente.resolver.ts
│   └── cliente.service.ts
├── vehiculo/
│   ├── dto/
│   │   ├── create-vehiculo.input.ts
│   │   └── update-vehiculo.input.ts
│   ├── entities/
│   │   └── vehiculo.entity.ts
│   ├── vehiculo.module.ts
│   ├── vehiculo.resolver.ts
│   └── vehiculo.service.ts
├── reserva/
│   ├── dto/
│   │   ├── create-reserva.input.ts
│   │   └── update-reserva.input.ts
│   ├── entities/
│   │   └── reserva.entity.ts
│   ├── reserva.module.ts
│   ├── reserva.resolver.ts
│   └── reserva.service.ts
├── app.module.ts
└── main.ts
```

## Pruebas Recomendadas

1. **Crear clientes** con diferentes datos para probar validaciones
2. **Crear vehículos** con estados disponible y reservado
3. **Realizar reservas** y verificar que el estado del vehículo cambia
4. **Consultar relaciones** entre entidades
5. **Probar validaciones** con datos inválidos
6. **Eliminar reservas** y verificar que el vehículo queda disponible

Este proyecto demuestra una implementación completa de GraphQL con NestJS siguiendo las mejores prácticas de arquitectura por capas.
