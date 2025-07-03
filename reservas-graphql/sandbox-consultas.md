# 🎮 Sandbox GraphQL - Consultas Preparadas

## 📊 Datos Precargados

El sandbox incluye datos de ejemplo:
- **3 Clientes** con información realista
- **5 Vehículos** de diferentes marcas y estados
- **3 Reservas** con diferentes estados y fechas

## 🔍 Consultas de Verificación del Sandbox

### 1. Ver todos los datos cargados

```graphql
query VerificarDatosSandbox {
  clientes {
    id
    nombre
    apellido
    email
    telefono
    reservas {
      id
      estado
      vehiculo {
        marca
        modelo
      }
    }
  }
  
  vehiculos {
    id
    marca
    modelo
    placa
    estado
    precio_por_dia
    reservas {
      id
      cliente {
        nombre
      }
    }
  }
  
  reservas {
    id
    estado
    precio_total
    fecha_inicio
    fecha_fin
    cliente {
      nombre
      apellido
    }
    vehiculo {
      marca
      modelo
      placa
    }
  }
}
```

### 2. Solo vehículos disponibles

```graphql
query VehiculosDisponibles {
  vehiculosDisponibles {
    id
    marca
    modelo
    placa
    color
    precio_por_dia
    tipo
    anio
  }
}
```

### 3. Cliente específico con sus reservas

```graphql
query ClienteConReservas {
  cliente(id: 1) {
    id
    nombre
    apellido
    email
    telefono
    direccion
    reservas {
      id
      fecha_inicio
      fecha_fin
      estado
      precio_total
      observaciones
      vehiculo {
        marca
        modelo
        placa
        color
        tipo
      }
    }
  }
}
```

### 4. Vehículo específico con su historial

```graphql
query VehiculoConHistorial {
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
      fecha_inicio
      fecha_fin
      estado
      precio_total
      cliente {
        nombre
        apellido
        email
        telefono
      }
    }
  }
}
```

## 🧪 Pruebas de Operaciones CRUD

### Crear nuevo cliente

```graphql
mutation CrearNuevoCliente {
  createCliente(createClienteInput: {
    nombre: "Ana Sofía"
    apellido: "González Herrera"
    email: "ana.gonzalez@email.com"
    telefono: "+52 55 8888 9999"
    direccion: "Calle Insurgentes 321, Col. Roma, CDMX"
    documento_identidad: "GOHA950712MDFRNN05"
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

### Crear nuevo vehículo

```graphql
mutation CrearNuevoVehiculo {
  createVehiculo(createVehiculoInput: {
    marca: "Volkswagen"
    modelo: "Jetta"
    placa: "BCD-987-EFG"
    tipo: "Sedán"
    anio: 2024
    color: "Plata"
    estado: "disponible"
    precio_por_dia: 550.00
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

### Crear nueva reserva

```graphql
mutation CrearNuevaReserva {
  createReserva(createReservaInput: {
    clienteId: 1
    vehiculoId: 3
    fecha_inicio: "2025-08-10T08:00:00.000Z"
    fecha_fin: "2025-08-15T18:00:00.000Z"
    estado: "pendiente"
    precio_total: 2000.00
    observaciones: "Reserva de prueba desde sandbox"
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

### Actualizar estado de reserva

```graphql
mutation ConfirmarReserva {
  updateReserva(updateReservaInput: {
    id: 2
    estado: "confirmada"
    observaciones: "Reserva confirmada - Pago recibido"
  }) {
    id
    estado
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

### Actualizar estado de vehículo

```graphql
mutation CambiarEstadoVehiculo {
  updateVehiculo(updateVehiculoInput: {
    id: 4
    estado: "disponible"
  }) {
    id
    marca
    modelo
    placa
    estado
  }
}
```

## 📈 Consultas Analíticas

### Resumen del sistema

```graphql
query ResumenSistema {
  todosClientes: clientes {
    id
    nombre
    apellido
  }
  
  todosVehiculos: vehiculos {
    id
    marca
    modelo
    estado
  }
  
  todasReservas: reservas {
    id
    estado
    precio_total
  }
  
  disponibles: vehiculosDisponibles {
    id
    marca
    modelo
  }
}
```

### Cliente con más reservas

```graphql
query ClienteActividad {
  clientes {
    id
    nombre
    apellido
    reservas {
      id
      estado
      precio_total
    }
  }
}
```

## 🎯 Casos de Uso Avanzados

### Búsqueda por estado de reserva

```graphql
query ReservasPorEstado {
  reservas {
    id
    estado
    fecha_inicio
    fecha_fin
    precio_total
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

### Vehículos por marca

```graphql
query VehiculosPorMarca {
  vehiculos {
    id
    marca
    modelo
    anio
    precio_por_dia
    estado
  }
}
```

## 🚀 Instrucciones del Sandbox

1. **Ejecutar el sandbox**:
   ```bash
   npm run sandbox
   ```

2. **O ejecutar manualmente**:
   ```bash
   npm run seed    # Cargar datos
   npm run start:dev    # Iniciar servidor
   ```

3. **Acceder al Playground**:
   ```
   http://localhost:3000/graphql
   ```

4. **Probar las consultas**: Copia y pega cualquiera de las consultas anteriores

## ✨ Características del Sandbox

- ✅ **Datos realistas**: Información verosímil de clientes, vehículos y reservas
- ✅ **Estados variados**: Vehículos disponibles, reservados y en mantenimiento
- ✅ **Relaciones completas**: Todas las entidades están interconectadas
- ✅ **Casos de prueba**: Escenarios típicos de un sistema de reservas
- ✅ **Validaciones activas**: Todas las reglas de negocio funcionando

¡Disfruta explorando la API GraphQL! 🎉
