# 🚗 Sistema de Reservas de Vehículos - NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 📋 Descripción

API REST desarrollada con NestJS para gestionar un sistema de reservas de vehículos. El sistema permite administrar clientes, vehículos y reservas con operaciones CRUD completas.

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una arquitectura modular de NestJS con las siguientes entidades:

### 📊 Entidades Principales

#### 👤 Cliente
```typescript
interface Cliente {
  id: number;
  nombre: string;
  correo: string;
}
```

#### 🚙 Vehiculo
```typescript
interface Vehiculo {
  id: number;
  marca: string;
  modelo: string;
  placa: string;
  tipo: string;
}
```

#### 📅 Reserva
```typescript
interface Reserva {
  id: number;
  cliente: Cliente;
  vehiculo: Vehiculo;
  fecha_inicio: Date;
  fecha_fin: Date;
  estado: string;
}
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd modulo-cliente
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar la base de datos**
```bash
# El proyecto usa SQLite por defecto
# La base de datos se crea automáticamente al iniciar la aplicación
```

## 🏃‍♂️ Ejecución del Proyecto

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run start:prod

# Modo desarrollo con watch
npm run start
```

La aplicación estará disponible en: `http://localhost:3000`

## 🔗 Endpoints de la API

### 👤 Clientes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/clientes` | Obtener todos los clientes |
| GET | `/clientes/:id` | Obtener un cliente por ID |
| POST | `/clientes` | Crear un nuevo cliente |
| PUT | `/clientes/:id` | Actualizar un cliente |
| DELETE | `/clientes/:id` | Eliminar un cliente |

**Ejemplo de creación de cliente:**
```json
POST /clientes
{
  "nombre": "Juan Pérez",
  "correo": "juan.perez@email.com"
}
```

### 🚙 Vehículos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/vehiculos` | Obtener todos los vehículos |
| GET | `/vehiculos/:id` | Obtener un vehículo por ID |
| POST | `/vehiculos` | Crear un nuevo vehículo |
| PUT | `/vehiculos/:id` | Actualizar un vehículo |
| DELETE | `/vehiculos/:id` | Eliminar un vehículo |

**Ejemplo de creación de vehículo:**
```json
POST /vehiculos
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "placa": "ABC-123",
  "tipo": "Sedán"
}
```

### 📅 Reservas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/reservas` | Obtener todas las reservas |
| GET | `/reservas/:id` | Obtener una reserva por ID |
| POST | `/reservas` | Crear una nueva reserva |
| PUT | `/reservas/:id` | Actualizar una reserva |
| DELETE | `/reservas/:id` | Eliminar una reserva |

**Ejemplo de creación de reserva:**
```json
POST /reservas
{
  "cliente_id": 1,
  "vehiculo_id": 1,
  "fecha_inicio": "2025-07-10",
  "fecha_fin": "2025-07-15",
  "estado": "activa"
}
```

## 🧪 Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas e2e
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

## 📁 Estructura del Proyecto

```
src/
├── cliente/
│   ├── dto/
│   ├── entities/
│   ├── cliente.controller.ts
│   ├── cliente.service.ts
│   └── cliente.module.ts
├── vehiculo/
│   ├── dto/
│   ├── entities/
│   ├── vehiculo.controller.ts
│   ├── vehiculo.service.ts
│   └── vehiculo.module.ts
├── reserva/
│   ├── dto/
│   ├── entities/
│   ├── reserva.controller.ts
│   ├── reserva.service.ts
│   └── reserva.module.ts
├── app.module.ts
└── main.ts
```

## 🛠️ Tecnologías Utilizadas

- **NestJS** - Framework de Node.js
- **TypeScript** - Lenguaje de programación
- **TypeORM** - ORM para base de datos
- **SQLite** - Base de datos
- **Class Validator** - Validación de datos
- **Swagger** - Documentación de API

## 📖 Documentación de la API

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación de Swagger en:

`http://localhost:3000/api`

## 🚀 Despliegue

Para desplegar la aplicación en producción:

1. **Construir el proyecto**
```bash
npm run build
```

2. **Ejecutar en modo producción**
```bash
npm run start:prod
```

## 📝 Notas de Desarrollo

- Las validaciones se implementan usando decoradores de `class-validator`
- Las relaciones entre entidades se manejan con TypeORM
- Los DTOs (Data Transfer Objects) se usan para validar entrada y salida de datos
- El proyecto sigue las mejores prácticas de NestJS

## 👨‍💻 Autor

**Isaac Zacha** - [GitHub](https://github.com/IsaacZacha)

## 📄 Licencia

Este proyecto es parte de un trabajo académico para la asignatura *Aplicación para el Servidor Web*.
