# GraphQL Queries y Mutations - Sistema de Reservas

## 🎟️ Queries Básicas

### Obtener todos los eventos
```graphql
query ObtenerEventos {
  eventos {
    id
    nombre
    descripcion
    fechaEvento
    horaInicio
    horaFin
    capacidadTotal
    entradasDisponibles
    imagenUrl
    activo
    ubicacion {
      id
      nombre
      ciudad
      direccion
      pais
    }
    tiposEntrada {
      id
      nombre
      precio
      descripcion
      cantidad
    }
  }
}
```

### Obtener evento específico con asientos
```graphql
query ObtenerEventoConAsientos($eventoId: Int!) {
  evento(id: $eventoId) {
    id
    nombre
    descripcion
    fechaEvento
    horaInicio
    capacidadTotal
    entradasDisponibles
    ubicacion {
      nombre
      ciudad
      direccion
    }
    asientos {
      id
      seccion
      fila
      numero
      ocupado
      tipoAsiento
      precio
      posicionX
      posicionY
    }
    tiposEntrada {
      id
      nombre
      precio
      cantidad
    }
  }
}
```

### Obtener asientos por sección
```graphql
query ObtenerAsientosPorSeccion($eventoId: Int!, $seccion: String!) {
  asientosPorSeccion(eventoId: $eventoId, seccion: $seccion) {
    seccion
    asientos {
      id
      fila
      numero
      ocupado
      tipoAsiento
      precio
    }
    totalAsientos
    asientosDisponibles
  }
}
```

### Obtener pedidos de un usuario
```graphql
query ObtenerPedidosUsuario($usuarioId: Int!) {
  pedidosPorUsuario(usuarioId: $usuarioId) {
    id
    estado
    total
    fechaCreacion
    fechaExpiracion
    entradas {
      id
      eventoId
      nombreEvento
      tipoEntradaId
      tipoEntradaNombre
      cantidad
      precio
      asientosSeleccionados
    }
  }
}
```

## ⚡ Mutations

### Crear pedido con asientos específicos
```graphql
mutation CrearPedidoConAsientos($input: CreatePedidoInput!) {
  crearPedido(createPedidoInput: $input) {
    id
    usuarioId
    estado
    total
    fechaCreacion
    fechaExpiracion
    entradas {
      id
      eventoId
      nombreEvento
      tipoEntradaId
      tipoEntradaNombre
      cantidad
      precio
      asientosSeleccionados
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "usuarioId": 1,
    "entradas": [
      {
        "eventoId": 1,
        "tipoEntradaId": 1,
        "cantidad": 2,
        "asientosSeleccionados": ["A1", "A2"]
      }
    ]
  }
}
```

### Reservar asientos temporalmente
```graphql
mutation ReservarAsientos($input: ReservarAsientoInput!) {
  reservarAsiento(input: $input) {
    success
    message
    tiempoExpiracion
    asientosReservados {
      id
      fila
      numero
      seccion
      precio
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "eventoId": 1,
    "usuarioId": 1,
    "asientoIds": [1, 2, 3],
    "tiempoReserva": 600
  }
}
```

### Procesar pago
```graphql
mutation ProcesarPago($input: ProcesarPagoInput!) {
  procesarPago(input: $input) {
    success
    message
    pagoId
    transaccionId
    estado
    fechaProcesamiento
  }
}
```

**Variables:**
```json
{
  "input": {
    "pedidoId": 1,
    "metodoPago": "TARJETA_CREDITO",
    "monto": 150.00,
    "detallesPago": {
      "numeroTarjeta": "**** **** **** 1234",
      "nombreTitular": "Juan Pérez",
      "codigoSeguridad": "123"
    }
  }
}
```

### Cancelar pedido
```graphql
mutation CancelarPedido($pedidoId: Int!, $motivo: String) {
  cancelarPedido(id: $pedidoId, motivo: $motivo) {
    success
    message
    pedido {
      id
      estado
      fechaCancelacion
    }
    asientosLiberados {
      id
      fila
      numero
      seccion
    }
  }
}
```

**Variables:**
```json
{
  "pedidoId": 1,
  "motivo": "Cancelación por parte del usuario"
}
```

## 🔍 Queries Avanzadas

### Buscar eventos por criterios
```graphql
query BuscarEventos($filtros: FiltroEventosInput!) {
  buscarEventos(filtros: $filtros) {
    id
    nombre
    fechaEvento
    ubicacion {
      ciudad
      nombre
    }
    precioMinimo
    precioMaximo
    entradasDisponibles
  }
}
```

**Variables:**
```json
{
  "filtros": {
    "ciudad": "Madrid",
    "fechaDesde": "2025-01-01",
    "fechaHasta": "2025-12-31",
    "precioMaximo": 200.00,
    "categorias": ["CONCIERTO", "TEATRO"]
  }
}
```

### Obtener estadísticas de evento
```graphql
query EstadisticasEvento($eventoId: Int!) {
  estadisticasEvento(eventoId: $eventoId) {
    totalAsientos
    asientosVendidos
    asientosDisponibles
    asientosReservados
    ingresosTotales
    ventasPorTipo {
      tipoEntrada
      cantidadVendida
      ingresos
    }
    ocupacionPorSeccion {
      seccion
      totalAsientos
      asientosOcupados
      porcentajeOcupacion
    }
  }
}
```

## 📊 Subscriptions (Tiempo Real)

### Suscribirse a cambios de asientos
```graphql
subscription CambiosAsientos($eventoId: Int!) {
  cambiosAsientos(eventoId: $eventoId) {
    asientoId
    estado
    usuarioId
    timestamp
  }
}
```

### Suscribirse a actualizaciones de pedido
```graphql
subscription ActualizacionesPedido($pedidoId: Int!) {
  actualizacionesPedido(pedidoId: $pedidoId) {
    pedidoId
    estado
    mensaje
    timestamp
  }
}
```

## 🛠️ Queries de Introspección

### Obtener schema completo
```graphql
query IntrospectionQuery {
  __schema {
    queryType {
      name
      fields {
        name
        description
        type {
          name
          kind
        }
      }
    }
    mutationType {
      name
      fields {
        name
        description
        type {
          name
          kind
        }
      }
    }
    types {
      name
      kind
      description
      fields {
        name
        type {
          name
          kind
        }
      }
    }
  }
}
```

### Obtener tipos disponibles
```graphql
query ObtenerTipos {
  __schema {
    types {
      name
      kind
      description
      enumValues {
        name
        description
      }
    }
  }
}
```

## 🧪 Queries de Prueba

### Test básico de conexión
```graphql
query TestConexion {
  __typename
}
```

### Obtener información del servidor
```graphql
query InfoServidor {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
  }
}
```

## 📝 Notas de Uso

1. **Variables**: Siempre usa variables para valores dinámicos en lugar de concatenar strings.
2. **Fragmentos**: Usa fragmentos para reutilizar campos comunes.
3. **Paginación**: Implementa paginación para listas grandes.
4. **Cache**: GraphQL permite un excelente caching del lado del cliente.
5. **Errores**: Siempre verifica el campo `errors` en la respuesta.

## 🚀 Ejemplos de Uso en JavaScript

```javascript
// Función para ejecutar queries
async function ejecutarQuery(query, variables = {}) {
  const response = await fetch('http://localhost:3001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables
    })
  });
  
  return await response.json();
}

// Ejemplo de uso
const resultado = await ejecutarQuery(`
  query ObtenerEvento($id: Int!) {
    evento(id: $id) {
      nombre
      fechaEvento
      asientos {
        id
        ocupado
        precio
      }
    }
  }
`, { id: 1 });
```
