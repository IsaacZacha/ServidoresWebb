# Sistema de Reserva de Entradas - Configuración JSON

## 📁 Estructura del Proyecto

Se han configurado **3 proyectos NestJS** independientes:
- **Rest/**: API REST tradicional
- **Graphql/**: API GraphQL con Apollo Server  
- **WebSocket/**: API WebSocket para tiempo real

## 🗄️ Persistencia de Datos

Todos los proyectos ahora usan **persistencia JSON** en lugar de base de datos:

### Archivos Principales:
- `data.json`: Contiene todos los datos del sistema
- `src/services/json-data.service.ts`: Servicio para manejar operaciones CRUD en JSON

### Servicios Actualizados:
- ✅ `usuario.service.ts` - Gestión de usuarios
- ✅ `evento.service.ts` - Gestión de eventos  
- ✅ `ubicacion.service.ts` - Gestión de ubicaciones
- ✅ `pedido.service.ts` - Gestión de pedidos
- ✅ `pago.service.ts` - Gestión de pagos

## 🚀 Instalación y Uso

### Para cada carpeta (Rest, Graphql, WebSocket):

1. **Instalar dependencias:**
   ```bash
   cd Rest # o Graphql o WebSocket
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run start:dev
   ```

3. **Ejecutar en producción:**
   ```bash
   npm run build
   npm run start:prod
   ```

## 📊 Datos de Ejemplo

El archivo `data.json` incluye:
- **3 Usuarios** con datos completos
- **3 Ubicaciones** (Teatro, Estadio, Palacio)
- **3 Eventos** (Concierto, Festival, Teatro)
- **7 Tipos de Entrada** (General, VIP, Premium)
- **6 Entradas** con diferentes estados
- **3 Pedidos** en varios estados
- **3 Pagos** con diferentes métodos

## 🔧 Configuración JSON

### Estructura del JsonDataService:
```typescript
// Métodos disponibles:
- findAll(collection): Obtener todos los registros
- findById(collection, id): Buscar por ID
- findBy(collection, criteria): Buscar con criterios
- create(collection, data): Crear nuevo registro
- update(collection, id, data): Actualizar registro
- delete(collection, id): Eliminar registro
```

### Colecciones disponibles:
- `usuarios`
- `ubicaciones` 
- `eventos`
- `tiposEntrada`
- `entradas`
- `pedidos`
- `pagos`

## 🌐 Endpoints Disponibles

### REST API (Puerto 3000):
- `GET/POST /usuarios` - Gestión de usuarios
- `GET/POST /eventos` - Gestión de eventos
- `GET/POST /ubicaciones` - Gestión de ubicaciones
- `GET/POST /pedidos` - Gestión de pedidos
- `GET/POST /pagos` - Gestión de pagos

### GraphQL API (Puerto 3001):
- Endpoint: `/graphql`
- Playground habilitado para pruebas
- Queries y Mutations disponibles

### WebSocket API (Puerto 3002):
- Conexiones en tiempo real
- Notificaciones de pedidos
- Actualizaciones de estado

## ⚠️ Notas Importantes

1. **Sin Base de Datos**: Los proyectos ya no requieren PostgreSQL ni TypeORM
2. **Persistencia Local**: Los datos se guardan en `data.json` automáticamente
3. **Sincronización**: Cada proyecto tiene su propia copia de datos
4. **Backup**: Recomendado hacer backup del `data.json` antes de cambios importantes

## 🔄 Próximos Pasos

1. Instalar dependencias en cada proyecto
2. Probar los endpoints disponibles
3. Verificar que los datos se persisten correctamente
4. Ajustar los controladores si es necesario

¡El sistema está listo para trabajar sin base de datos! 🎉
