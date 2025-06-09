# Arquitectura Limpia - Todo API

Implementación de una API REST con arquitectura limpia que soporta múltiples tipos de datasource:
- **Prisma** (PostgreSQL)
- **TypeORM** (PostgreSQL)
- **Memory** (Arreglos de objetos literales en memoria)

## Características

### Arquitectura Limpia
- **Domain Layer**: Entidades, casos de uso, repositorios e interfaces
- **Infrastructure Layer**: Implementaciones de datasources y repositorios
- **Presentation Layer**: Controladores y rutas

### Datasources Disponibles
1. **Prisma**: Base de datos PostgreSQL con ORM Prisma
2. **TypeORM**: Base de datos PostgreSQL con TypeORM
3. **Memory**: Almacenamiento en memoria con arreglos de objetos literales

## Configuración y Desarrollo

### ⚡ Inicio Rápido - Sin Base de Datos (Recomendado para desarrollo)

```bash
# Instalar dependencias
npm install

# Ejecutar con datasource de memoria (NO requiere base de datos)
npm run dev:memory
```

¡Eso es todo! La aplicación funcionará completamente en memoria sin necesidad de Docker ni PostgreSQL.

### 🗄️ Con Base de Datos (Prisma/TypeORM)

#### Opción 1: Prisma
```bash
# 1. Crear archivo .env basado en .env.template
# 2. Configurar DATASOURCE_TYPE=PRISMA en .env
# 3. Ejecutar Docker
docker compose up -d
# 4. Migrar base de datos
npm run prisma:migrate:prod
# 5. Ejecutar aplicación
npm run dev:prisma
```

#### Opción 2: TypeORM
```bash
# 1. Crear archivo .env basado en .env.template
# 2. Configurar DATASOURCE_TYPE=TYPEORM en .env
# 3. Ejecutar Docker
docker compose up -d
# 4. Ejecutar aplicación
npm run dev:typeorm
```

## Scripts Disponibles

### Desarrollo
- `npm run dev` - Modo desarrollo (detecta DATASOURCE_TYPE automáticamente, por defecto: MEMORY)
- `npm run dev:memory` - Desarrollo con datasource de memoria
- `npm run dev:prisma` - Desarrollo con Prisma 
- `npm run dev:typeorm` - Desarrollo con TypeORM

### Producción
- `npm run start:memory` - Producción con datasource de memoria
- `npm run start:prisma` - Producción con Prisma
- `npm run start:typeorm` - Producción con TypeORM

## Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```bash
# Puerto de la aplicación
PORT=3000

# Tipo de datasource (MEMORY | PRISMA | TYPEORM)
# Default: MEMORY
DATASOURCE_TYPE=MEMORY

# Solo requerido para PRISMA/TYPEORM
POSTGRES_URL=postgresql://postgres:123456@localhost:5432/TodoDB

# Solo para Docker
POSTGRES_USER=postgres
POSTGRES_DB=TodoDB
POSTGRES_PASSWORD=123456
```

## API Endpoints

### Endpoints Unificados
- Base URL: `/api/todos`
- **Funciona con cualquier datasource** configurado
- Operaciones CRUD estándar

### Endpoints Específicos de Memoria
- Base URL: `/api/todos-memory`
- Operaciones CRUD + funcionalidades adicionales de gestión de datos
- **Siempre usa datasource de memoria**, independiente de la configuración

Para más detalles sobre los endpoints de memoria, consulta [MEMORY_DATASOURCE.md](./MEMORY_DATASOURCE.md)

## Casos de Uso

### 🧠 Memory Datasource (Recomendado para inicio)
- ✅ **Desarrollo rápido** sin configuración de base de datos
- ✅ **Testing** y prototipos instantáneos
- ✅ **Demos** y presentaciones
- ✅ **Aprendizaje** de arquitectura limpia
- ✅ **CI/CD** sin dependencias externas

### 🗄️ Prisma/TypeORM
- ✅ Aplicaciones en producción
- ✅ Persistencia de datos
- ✅ Aplicaciones multi-usuario
- ✅ Transacciones complejas

## Detección Automática de Datasource

La aplicación detecta automáticamente qué datasource usar:

1. **Variable de entorno `DATASOURCE_TYPE`** (prioridad alta)
2. **Script npm específico** (ej: `npm run dev:memory`)
3. **Por defecto**: MEMORY (si no se especifica nada)

### Logs de Inicio
La aplicación muestra claramente qué datasource está usando:

```bash
🔧 Starting application with datasource: MEMORY
🧠 Using memory datasource - no database initialization required
💾 Data will be stored in memory arrays and lost on restart
🔗 Available endpoints: /api/todos-memory
🎯 Datasource configured: MEMORY
```

## Testing

Puedes usar el archivo `memory-datasource.http` para probar la funcionalidad con tu cliente HTTP favorito (REST Client, Postman, etc.)

## Ventajas de esta Arquitectura

1. **🔄 Intercambiable**: Cambia entre datasources sin modificar código de negocio
2. **🚀 Inicio inmediato**: Funciona sin configuración con datasource de memoria
3. **🧪 Testing**: Ideal para pruebas sin dependencias externas
4. **📚 Educativo**: Perfecto para aprender arquitectura limpia
5. **🔧 Flexible**: Cada datasource para su caso de uso específico

## Documentación Adicional

- [Memory Datasource Guide](./MEMORY_DATASOURCE.md) - Guía completa del datasource de memoria
- [memory-datasource.http](./memory-datasource.http) - Ejemplos de peticiones HTTP

## Aplicación sobre defensas de trabajos de titulación

La primera imagen muestra un listado de defensas de trabajos de titulación.

![I1](./public/assets/images/I1.jpg)

La segunda imagen es el detalle que presenta una defensa así como el enlace con los estudiantes que participarán en la misma.

![I2](./public/assets/images/I2.jpg)

En la tercera imagen visualizamos los detalles que se consideran por cada uno de quienes sustentarán.

![I3](./public/assets/images/I3.jpg)

En la cuarta imagen se muestra el mecanismo de asignación para estas defensas. (revisar las 2 últimas imágenes)

![I4](./public/assets/images/I4.jpg)

En la quinta y sexta imagen podemos ver la configuración de las aulas y horarios disponibles para las defensas.

![I5](./public/assets/images/I5.jpg)
![I6](./public/assets/images/I5.jpg)

Considerar todas las relaciones no explicitas que muestren las imágenes pero que consoliden su diseño.


### Entidades Principales

- **DefensaEntity**  
  Representa una defensa de trabajo de titulación.  
  *Justificación:* Es el evento principal del sistema, centraliza la información y relaciones.

- **EstudianteEntity**  
  Representa a un estudiante que participa en una defensa.  
  *Justificación:* Permite identificar y asociar a los estudiantes con sus defensas.

- **JuradoEntity**  
  Representa a un jurado disponible para asignación.  
  *Justificación:* Permite gestionar los docentes que pueden ser asignados como jurados.

- **JuradoAsignadoEntity**  
  Relaciona un jurado con una defensa y su rol específico (presidente, secretario, vocal).  
  *Justificación:* Permite asignar roles específicos a cada jurado en una defensa.

- **AulaEntity**  
  Representa un aula disponible para defensas.  
  *Justificación:* Permite gestionar la disponibilidad y asignación de espacios físicos.

- **HorarioEntity**  
  Representa un horario disponible para asignar defensas.  
  *Justificación:* Permite organizar y evitar conflictos en la programación de defensas.

### Relaciones entre Entidades

- Una **Defensa** tiene varios **Estudiantes** (participantes).
- Una **Defensa** tiene varios **JuradoAsignadoEntity** (jurados con rol).
- Una **Defensa** se realiza en un **Aula** y en un **Horario** específico.
- Un **Estudiante** puede participar en una o varias defensas.
- Un **Jurado** puede participar en varias defensas, con diferentes roles.

### Abstracción de Capas (Arquitectura Limpia)

- **Domain Layer (Dominio):**
  - Entidades: DefensaEntity, EstudianteEntity, JuradoEntity, JuradoAsignadoEntity, AulaEntity, HorarioEntity.
  - Interfaces de repositorio para acceso a datos.
  - Casos de uso (ejemplo: programar defensa, asignar jurados).

- **Infrastructure Layer (Infraestructura):**
  - Implementaciones de repositorios y datasources (memoria, base de datos).
  - Adaptadores para persistencia de entidades.

- **Presentation Layer (Presentación):**
  - Controladores y rutas para exponer la API REST.
  - Validaciones y manejo de solicitudes/respuestas.

---

**Con esto completas el primer parámetro de la rúbrica:**
- Entidades, atributos y relaciones.
- Abstracción de capas.
- Descripción y justificación de cada entidad.

### Endpoint de defensas en memoria

- `GET /api/todos/defensas-memory`  
  Devuelve todas las defensas almacenadas en memoria (JSON).