# Sistema de Reserva de Asientos - GraphQL API

Este módulo implementa una API GraphQL para la funcionalidad de selección y reserva de asientos mostrada en la imagen de la aplicación móvil.

## Funcionalidades Implementadas

### 🎫 Selección de Asientos
- **Mapa interactivo de asientos** con diferentes secciones (General, VIP, Premium)
- **Visualización en tiempo real** del estado de asientos (disponible, ocupado, seleccionado)
- **Selección múltiple** de asientos con feedback visual
- **Cálculo automático** de precios basado en tipo de entrada y cantidad

### 🎭 Tipos de Entrada
Según la imagen, se manejan tres tipos principales:

1. **Entrada General**
   - Precio base: $50,000
   - Acceso a sección general
   - Asientos estándar

2. **Entrada VIP** 
   - Precio: $100,000
   - Acceso preferencial
   - Mejores ubicaciones

3. **Entrada Premium**
   - Precio: $150,000
   - Acceso completo
   - Asientos premium con beneficios adicionales

## Estructura del Proyecto

```
GraphQL/
├── src/
│   ├── resolvers/
│   │   ├── asiento.resolver.ts          # Manejo de asientos y secciones
│   │   ├── tipo-entrada.resolver.ts     # Tipos de entrada disponibles  
│   │   ├── evento.resolver.ts           # Información de eventos
│   │   └── pedido.resolver.ts           # Creación de pedidos
│   ├── services/
│   │   ├── asiento.service.ts           # Lógica de negocio para asientos
│   │   └── json-data.service.ts         # Servicio de persistencia
│   └── app.module.ts                    # Configuración GraphQL
├── GraphQL-Queries.md                   # Documentación de queries
└── ejemplo-cliente-asientos.js          # Ejemplo de implementación cliente
```

## Queries Principales

### 1. Obtener Mapa de Asientos
```graphql
query AsientosPorEvento($eventoId: Int!) {
  asientosPorEvento(eventoId: $eventoId) {
    nombre          # Nombre de la sección
    totalAsientos   # Total de asientos en la sección
    asientosDisponibles  # Asientos disponibles
    asientos {
      id
      fila
      numero
      ocupado
      tipoAsiento   # general, vip, premium
      precio
      posicionX     # Para renderizado del mapa
      posicionY
    }
  }
}
```

### 2. Obtener Tipos de Entrada
```graphql
query TiposEntradaPorEvento($eventoId: Int!) {
  tiposEntradaPorEvento(eventoId: $eventoId) {
    id
    nombre
    descripcion
    precio
    beneficios
  }
}
```

## Mutations Principales

### 1. Reservar Asientos
```graphql
mutation ReservarAsientos($eventoId: Int!, $asientosIds: [Int!]!, $usuarioId: Int!) {
  reservarAsientos(eventoId: $eventoId, asientosIds: $asientosIds, usuarioId: $usuarioId) {
    exito
    mensaje
    asientosReservados
  }
}
```

### 2. Crear Pedido
```graphql
mutation CrearPedido($createPedidoInput: CreatePedidoInput!) {
  crearPedido(createPedidoInput: $createPedidoInput) {
    id
    total
    estado
    entradas {
      tipoEntradaNombre
      cantidad
      precio
      asientosAsignados
    }
  }
}
```

## Flujo de Usuario (basado en la imagen)

1. **Carga inicial**
   - Query para obtener información del evento
   - Query para cargar mapa de asientos
   - Query para obtener tipos de entrada disponibles

2. **Selección interactiva**
   - Usuario selecciona asientos en el mapa visual
   - Sistema calcula precio total automáticamente
   - Validación de disponibilidad en tiempo real

3. **Confirmación**
   - Mutation para reservar asientos seleccionados
   - Mutation para crear pedido final
   - Redirección a proceso de pago

## Configuración GraphQL

El módulo está configurado con:

- **Apollo Server** con landing page personalizada
- **Schema auto-generado** desde TypeScript decorators
- **Context** con información de request
- **Playground deshabilitado** (se usa Apollo Studio)

## Uso del Cliente

Ver `ejemplo-cliente-asientos.js` para implementación completa del lado cliente que incluye:

- Manejo de estado de asientos seleccionados
- Integración con queries y mutations GraphQL
- Validaciones y manejo de errores
- Cálculo de precios en tiempo real

## Datos de Prueba

El sistema genera asientos dinámicamente basado en:
- Capacidad total del evento
- Distribución automática por secciones
- Precios diferenciados por tipo
- Estado aleatorio de ocupación para testing

## Tecnologías Utilizadas

- **NestJS** con GraphQL module
- **Apollo Server** v4
- **TypeScript** con decorators
- **Code-first approach** para schema GraphQL
- **JSON-based persistence** para desarrollo

## Próximos Pasos

1. Integración con WebSockets para actualizaciones en tiempo real
2. Implementación de timeout para reservas temporales
3. Sistema de pagos integrado
4. Notificaciones push para confirmaciones
