# 🚀 Guía Rápida de Inicio

## ⚡ Inicio Rápido (5 minutos)

### 1. Ejecutar el Sandboxxxxx
```bash
npm run sandbox
```

### 2. Abrir GraphQL Playground
```
http://localhost:3000/graphql
```

### 3. Probar consulta rápida
```graphql
query {
  clientes {
    id
    nombre
    apellido
    email
  }
  vehiculosDisponibles {
    id
    marca
    modelo
    precio_por_dia
  }
}
```

## 📋 Cheat Sheet de Consultas

### Ver todos los datos
```graphql
query {
  clientes { id nombre apellido email }
  vehiculos { id marca modelo estado precio_por_dia }
  reservas { id estado precio_total }
}
```

### Crear cliente nuevo
```graphql
mutation {
  createCliente(createClienteInput: {
    nombre: "Tu Nombre"
    apellido: "Tu Apellido"
    email: "tu@email.com"
    telefono: "123456789"
  }) {
    id nombre apellido email
  }
}
```

### Crear reserva
```graphql
mutation {
  createReserva(createReservaInput: {
    clienteId: 1
    vehiculoId: 1
    fecha_inicio: "2025-07-20T10:00:00.000Z"
    fecha_fin: "2025-07-25T10:00:00.000Z"
    estado: "pendiente"
    precio_total: 500.00
  }) {
    id
    cliente { nombre }
    vehiculo { marca modelo }
    estado
  }
}
```

## 🎯 Lo que puedes hacer

✅ **CRUD Completo**: Crear, leer, actualizar, eliminar
✅ **Relaciones**: Ver datos conectados entre entidades
✅ **Validaciones**: Probar campos obligatorios y formatos
✅ **Estados**: Manejar disponibilidad de vehículos
✅ **Fechas**: Trabajar con rangos de reservas

## 📁 Archivos Importantes

- `sandbox-consultas.md` - Consultas completas preparadas
- `ejemplos-graphql.md` - Ejemplos detallados de todas las operaciones
- `PROYECTO-DOCUMENTACION.md` - Documentación completa del proyecto

## 🔧 Comandos Útiles

```bash
npm run sandbox     # Datos + Servidor
npm run seed        # Solo datos
npm run start:dev   # Solo servidor
```

---

¡Listo para explorar! 🎉
