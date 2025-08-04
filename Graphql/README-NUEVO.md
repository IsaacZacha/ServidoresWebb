# Sistema de Venta de Entradas - NestJS

Sistema completo de venta de entradas para eventos desarrollado con NestJS, TypeORM y PostgreSQL.

## 🚀 Características

- **Gestión de Usuarios**: Registro y gestión de compradores
- **Gestión de Eventos**: Creación y administración de eventos
- **Sistema de Entradas**: Diferentes tipos (General, VIP, Premium)
- **Procesamiento de Pedidos**: Gestión completa del ciclo de compra
- **Sistema de Pagos**: Procesamiento seguro de pagos
- **Códigos QR**: Generación automática para entradas
- **API REST**: Endpoints completos para todas las funcionalidades

## 🏗️ Arquitectura

### Entidades Principales

- **Usuario**: Información del comprador
- **Evento**: Conciertos, estrenos, espectáculos
- **Ubicación**: Lugares donde se realizan los eventos  
- **TipoEntrada**: Categorías de entradas (General, VIP, Premium)
- **Entrada**: Entradas individuales con códigos QR
- **Pedido**: Órdenes de compra con estados
- **Pago**: Procesamiento y seguimiento de pagos

### Estados del Sistema

#### Estados de Pedido
- `PENDIENTE`: Pedido creado, esperando confirmación
- `CONFIRMADO`: Pedido confirmado, listo para pago
- `PAGADO`: Pago procesado exitosamente
- `CANCELADO`: Pedido cancelado
- `COMPLETADO`: Pedido finalizado

#### Estados de Entrada
- `DISPONIBLE`: Entrada disponible para venta
- `RESERVADA`: Entrada reservada temporalmente
- `VENDIDA`: Entrada vendida y pagada
- `UTILIZADA`: Entrada utilizada en el evento

#### Estados de Pago
- `PENDIENTE`: Pago iniciado
- `PROCESANDO`: Pago en proceso
- `COMPLETADO`: Pago exitoso
- `FALLIDO`: Pago rechazado
- `REEMBOLSADO`: Pago reembolsado

## 🛠️ Instalación

### Prerrequisitos
- Node.js 18+
- PostgreSQL 12+
- npm o yarn

### Configuración

1. **Instalar dependencias**
```bash
npm install
```

2. **Configurar base de datos**
```bash
# Crear base de datos PostgreSQL
createdb ticket_booking
```

3. **Configurar variables de entorno**
Editar el archivo `.env` con tus configuraciones de base de datos

4. **Ejecutar la aplicación**
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📚 Uso de la API

### Endpoints Principales

#### Usuarios
- `POST /api/usuarios` - Crear usuario
- `GET /api/usuarios` - Listar usuarios
- `GET /api/usuarios/:id` - Obtener usuario por ID
- `PUT /api/usuarios/:id` - Actualizar usuario

#### Eventos
- `POST /api/eventos` - Crear evento
- `GET /api/eventos` - Listar eventos
- `GET /api/eventos/:id` - Obtener evento por ID
- `GET /api/eventos/proximos` - Eventos próximos

#### Pedidos
- `POST /api/pedidos` - Crear pedido
- `GET /api/pedidos/:id` - Obtener pedido
- `PUT /api/pedidos/:id/confirmar` - Confirmar pedido
- `PUT /api/pedidos/:id/cancelar` - Cancelar pedido

#### Pagos
- `POST /api/pagos` - Procesar pago
- `GET /api/pagos/:id` - Obtener pago
- `PUT /api/pagos/:id/reembolsar` - Reembolsar pago

### Ejemplo de Uso

#### 1. Crear un pedido
```bash
POST /api/pedidos
{
  "usuarioId": 1,
  "entradas": [
    {
      "eventoId": 1,
      "tipoEntradaId": 1,
      "cantidad": 2,
      "numeroAsiento": "A15-A16",
      "fila": "A",
      "seccion": "VIP"
    }
  ]
}
```

#### 2. Procesar pago
```bash
POST /api/pagos
{
  "pedidoId": 1,
  "metodoPago": "TARJETA_CREDITO",
  "monto": 155.00,
  "datosPago": {
    "numeroTarjeta": "****1234",
    "titular": "Juan Pérez"
  }
}
```

## 🗄️ Base de Datos

La aplicación utiliza PostgreSQL con las siguientes tablas principales:

- `usuarios` - Información de usuarios
- `ubicaciones` - Ubicaciones de eventos
- `eventos` - Información de eventos
- `tipos_entrada` - Tipos de entradas disponibles
- `entradas` - Entradas individuales
- `pedidos` - Órdenes de compra
- `pagos` - Información de pagos

## 📁 Estructura del Proyecto

```
src/
├── entities/          # Entidades de TypeORM
├── dtos/             # Data Transfer Objects
├── services/         # Lógica de negocio
├── controllers/      # Controladores REST
├── seeds/           # Datos de ejemplo
├── app.module.ts    # Módulo principal
└── main.ts          # Punto de entrada
```

## 🔧 Desarrollo

### Convenciones de Código

- Usar nombres en español para campos de base de datos
- Validar todos los DTOs con class-validator
- Manejar transacciones para operaciones críticas
- Usar enums para estados y tipos
- Implementar paginación en listados grandes

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT.
