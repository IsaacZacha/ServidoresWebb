# Ejemplos de Consultas GraphQL - Sistema de Reservas de Vehículos

## 1. Operaciones CRUD para Cliente

### Crear Cliente
```graphql
mutation {
  createCliente(createClienteInput: {
    nombre: "Juan"
    apellido: "Pérez"
    email: "juan.perez@email.com"
    telefono: "123456789"
    direccion: "Calle 123, Ciudad"
    documento_identidad: "12345678"
  }) {
    id
    nombre
    apellido
    email
    telefono
    direccion
    documento_identidad
  }
}
```

### Obtener todos los Clientes
```graphql
query {
  clientes {
    id
    nombre
    apellido
    email
    telefono
    direccion
    documento_identidad
    reservas {
      id
      estado
      fecha_inicio
      fecha_fin
    }
  }
}
```

### Obtener Cliente por ID
```graphql
query {
  cliente(id: 1) {
    id
    nombre
    apellido
    email
    telefono
    direccion
    documento_identidad
    reservas {
      id
      estado
      precio_total
    }
  }
}
```

### Actualizar Cliente
```graphql
mutation {
  updateCliente(updateClienteInput: {
    id: 1
    telefono: "987654321"
    direccion: "Nueva Dirección 456"
  }) {
    id
    nombre
    apellido
    email
    telefono
    direccion
  }
}
```

### Eliminar Cliente
```graphql
mutation {
  removeCliente(id: 1) {
    id
    nombre
    apellido
  }
}
```

## 2. Operaciones CRUD para Vehículo

### Crear Vehículo
```graphql
mutation {
  createVehiculo(createVehiculoInput: {
    marca: "Toyota"
    modelo: "Corolla"
    placa: "ABC123"
    tipo: "Sedán"
    anio: 2022
    color: "Blanco"
    estado: "disponible"
    precio_por_dia: 50.00
  }) {
    id
    marca
    modelo
    placa
    tipo
    anio
    color
    estado
    precio_por_dia
  }
}
```

### Obtener todos los Vehículos
```graphql
query {
  vehiculos {
    id
    marca
    modelo
    placa
    tipo
    anio
    color
    estado
    precio_por_dia
    reservas {
      id
      estado
      fecha_inicio
      fecha_fin
    }
  }
}
```

### Obtener Vehículos Disponibles
```graphql
query {
  vehiculosDisponibles {
    id
    marca
    modelo
    placa
    tipo
    anio
    color
    precio_por_dia
  }
}
```

### Obtener Vehículo por ID
```graphql
query {
  vehiculo(id: 1) {
    id
    marca
    modelo
    placa
    tipo
    anio
    color
    estado
    precio_por_dia
    reservas {
      id
      cliente {
        nombre
        apellido
      }
      fecha_inicio
      fecha_fin
      estado
    }
  }
}
```

### Actualizar Vehículo
```graphql
mutation {
  updateVehiculo(updateVehiculoInput: {
    id: 1
    precio_por_dia: 60.00
    estado: "mantenimiento"
  }) {
    id
    marca
    modelo
    precio_por_dia
    estado
  }
}
```

### Eliminar Vehículo
```graphql
mutation {
  removeVehiculo(id: 1) {
    id
    marca
    modelo
    placa
  }
}
```

## 3. Operaciones CRUD para Reserva

### Crear Reserva
```graphql
mutation {
  createReserva(createReservaInput: {
    clienteId: 1
    vehiculoId: 1
    fecha_inicio: "2025-07-10T10:00:00.000Z"
    fecha_fin: "2025-07-15T10:00:00.000Z"
    estado: "pendiente"
    precio_total: 250.00
    observaciones: "Reserva para vacaciones"
  }) {
    id
    cliente {
      nombre
      apellido
      email
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
    fecha_creacion
    observaciones
  }
}
```

### Obtener todas las Reservas
```graphql
query {
  reservas {
    id
    cliente {
      id
      nombre
      apellido
      email
    }
    vehiculo {
      id
      marca
      modelo
      placa
      precio_por_dia
    }
    fecha_inicio
    fecha_fin
    estado
    precio_total
    fecha_creacion
    observaciones
  }
}
```

### Obtener Reserva por ID
```graphql
query {
  reserva(id: 1) {
    id
    cliente {
      nombre
      apellido
      email
      telefono
    }
    vehiculo {
      marca
      modelo
      placa
      tipo
      color
    }
    fecha_inicio
    fecha_fin
    estado
    precio_total
    fecha_creacion
    observaciones
  }
}
```

### Actualizar Reserva
```graphql
mutation {
  updateReserva(updateReservaInput: {
    id: 1
    estado: "confirmada"
    precio_total: 280.00
    observaciones: "Reserva confirmada con descuento"
  }) {
    id
    estado
    precio_total
    observaciones
    cliente {
      nombre
      apellido
    }
    vehiculo {
      marca
      modelo
    }
  }
}
```

### Eliminar Reserva
```graphql
mutation {
  removeReserva(id: 1) {
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
    estado
  }
}
```

## 4. Consultas Complejas

### Obtener Cliente con todas sus Reservas y Vehículos
```graphql
query {
  cliente(id: 1) {
    id
    nombre
    apellido
    email
    reservas {
      id
      fecha_inicio
      fecha_fin
      estado
      precio_total
      vehiculo {
        marca
        modelo
        tipo
        color
      }
    }
  }
}
```

### Obtener Vehículo con todas sus Reservas y Clientes
```graphql
query {
  vehiculo(id: 1) {
    id
    marca
    modelo
    placa
    reservas {
      id
      fecha_inicio
      fecha_fin
      estado
      precio_total
      cliente {
        nombre
        apellido
        email
      }
    }
  }
}
```

## Instrucciones de Uso

1. **Abrir GraphQL Playground**: Visita http://localhost:3000/graphql
2. **Probar Operaciones**: Copia y pega las consultas anteriores en el playground
3. **Orden Recomendado**:
   - Primero crear clientes
   - Luego crear vehículos  
   - Finalmente crear reservas (requiere IDs de cliente y vehículo existentes)
4. **Validaciones**: El sistema incluye validaciones automáticas para emails, campos requeridos, etc.
5. **Relaciones**: Las consultas pueden incluir datos relacionados usando los campos de navegación

## Características Implementadas

✅ **Entidades**: Cliente, Vehículo, Reserva
✅ **Operaciones CRUD**: Crear, Leer, Actualizar, Eliminar para todas las entidades
✅ **Validaciones**: Usando class-validator para integridad de datos
✅ **Relaciones**: Asociaciones entre Cliente-Reserva y Vehículo-Reserva
✅ **GraphQL**: API completa con queries y mutations
✅ **TypeORM**: Persistencia en base de datos SQLite
✅ **Arquitectura por Capas**: Entity, DTO, Service, Resolver
