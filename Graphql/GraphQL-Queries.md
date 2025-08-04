# GraphQL API para Selección de Asientos

## Queries Principales

### 1. Obtener información del evento
```graphql
query ObtenerEvento($eventoId: Int!) {
  evento(id: $eventoId) {
    id
    nombre
    descripcion
    fechaEvento
    horaInicio
    horaFin
    capacidadTotal
    entradasDisponibles
    imagenUrl
    ubicacion {
      nombre
      direccion
      ciudad
    }
  }
}
```

### 2. Obtener asientos por evento (pantalla principal)
```graphql
query AsientosPorEvento($eventoId: Int!) {
  asientosPorEvento(eventoId: $eventoId) {
    nombre
    totalAsientos
    asientosDisponibles
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
  }
}
```

### 3. Obtener tipos de entrada disponibles
```graphql
query TiposEntradaPorEvento($eventoId: Int!) {
  tiposEntradaPorEvento(eventoId: $eventoId) {
    id
    nombre
    descripcion
    precio
    activo
    beneficios
  }
}
```

## Mutations

### 1. Reservar asientos
```graphql
mutation ReservarAsientos($eventoId: Int!, $asientosIds: [Int!]!, $usuarioId: Int!) {
  reservarAsientos(eventoId: $eventoId, asientosIds: $asientosIds, usuarioId: $usuarioId) {
    exito
    mensaje
    asientosReservados
  }
}
```

### 2. Crear pedido con asientos seleccionados
```graphql
mutation CrearPedido($createPedidoInput: CreatePedidoInput!) {
  crearPedido(createPedidoInput: $createPedidoInput) {
    id
    usuarioId
    estado
    total
    fechaCreacion
    entradas {
      id
      eventoId
      nombreEvento
      tipoEntradaId
      tipoEntradaNombre
      cantidad
      precio
      asientosAsignados
    }
  }
}
```

## Variables de ejemplo para la pantalla mostrada

### Para obtener asientos del evento:
```json
{
  "eventoId": 1
}
```

### Para reservar asientos específicos:
```json
{
  "eventoId": 1,
  "asientosIds": [15, 16, 17],
  "usuarioId": 1
}
```

### Para crear un pedido:
```json
{
  "createPedidoInput": {
    "usuarioId": 1,
    "entradas": [
      {
        "eventoId": 1,
        "tipoEntradaId": 1,
        "cantidad": 3,
        "asientosSeleccionados": [15, 16, 17]
      }
    ]
  }
}
```

## Flujo de la aplicación basado en la imagen:

1. **Carga inicial**: 
   - Query `ObtenerEvento` para obtener información del evento
   - Query `AsientosPorEvento` para mostrar el mapa de asientos
   - Query `TiposEntradaPorEvento` para mostrar las opciones de entrada

2. **Selección de asientos**:
   - El usuario hace clic en asientos disponibles
   - Se actualiza el estado local de asientos seleccionados

3. **Confirmación**:
   - Mutation `ReservarAsientos` para reservar temporalmente
   - Mutation `CrearPedido` para crear el pedido final

## Tipos de entrada mostrados en la imagen:

- **Entrada General**: Acceso básico al evento
- **Entrada VIP**: Acceso preferencial con beneficios adicionales  
- **Entrada Premium**: Acceso completo con todos los beneficios

Cada tipo tiene diferentes precios y ubicaciones en el mapa de asientos.
