---

## 📌 Descripción

Esta aplicación construida con **NestJS** y **WebSockets (Socket.IO)** permite gestionar en tiempo real entidades de **Sensores**, **Lecturas** y **Ubicaciones**.

Utiliza **puertos WebSocket** para enviar y recibir datos en vivo desde clientes compatibles, como Postman o apps frontend.

---

## 🚀 Instalación

Clona el repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/EmilioSle/APLICACION-PARA-EL-SERVIDOR-WEB.git
cd APLICACION-PARA-EL-SERVIDOR-WEB/Segundo_Parcial/practica/practica3-websocket
npm install
```

---

## ▶️ Ejecución

```bash
npm run start:dev
```

El servidor WebSocket estará escuchando por defecto en:\
`ws://localhost:3000`

---

## 🔌 Eventos Disponibles

### ✅ SensorGateway

| Evento WebSocket       | Acción                              | Payload de Ejemplo                                                            |
| ---------------------- | ----------------------------------- | ----------------------------------------------------------------------------- |
| `crearSensor`          | Crear un sensor                     | `{ "nombre": "Sensor A", "tipo": "Humedad" }`                                 |
| `listarSensores`       | Listar sensores                     | *(vacío)*                                                                     |
| `actualizarSensor`     | Actualizar sensor                   | `{ "id": 1, "data": { "nombre": "Sensor A Modificado", "tipo": "Digital" } }` |
| `eliminarSensor`       | Eliminar sensor por ID              | `1`                                                                           |
| `sensoresActualizados` | Emitido automáticamente tras cambio | *(respuesta array)*                                                           |

#### 📄 Ejemplos visuales

**Crear Sensor**  
![se crea un sensor y se envia](../practica3-websocket/Image/SensorCrear_Enviar.png)  
![se crea un sensor y se recibe](../practica3-websocket/Image/SensorCrear_Recibe.png)

**Actualizar Sensor**  
![se actualiza el sensor y se envia](../practica3-websocket/Image/SensorActualizar_Enviar.png)  
![se actualiza el sensor y se recibe](../practica3-websocket/Image/SensorActualizar_Recibe.png)

**Eliminar Sensor**  
![se elimina el sensor y se envia](../practica3-websocket/Image/SensorEliminado_Enviar.png)  
![se elimina el sensor y se recibe](../practica3-websocket/Image/SensorEliminado_Recibe.png)

---

### 📊 LecturaGateway

| Evento WebSocket       | Acción                    | Payload de Ejemplo                                                                   |
| ---------------------- | ------------------------- | ------------------------------------------------------------------------------------ |
| `crearLectura`         | Crear lectura             | `{ "valor": 25.6, "fecha": "2025-07-14T18:00:00", "sensorId": 1, "ubicacionId": 1 }` |
| `listarLecturas`       | Listar todas las lecturas | *(vacío)*                                                                            |
| `updateLectura`        | Actualizar lectura        | `{ "id": 2, "updateLecturaDto": { "valor": 26.1 } }`                                 |
| `lecturasActualizadas` | Emitido tras un cambio    | *(respuesta array)*                                                                  |

---

### 🏠 UbicacionGateway

| Evento WebSocket          | Acción                    | Payload de Ejemplo                                          |
| ------------------------- | ------------------------- | ----------------------------------------------------------- |
| `crearUbicacion`          | Crear ubicación           | `{ "nombre": "Zona A", "coordenadas": "-2.14,-79.87" }`     |
| `listarUbicaciones`       | Listar ubicaciones        | *(vacío)*                                                   |
| `updateUbicacion`         | Actualizar ubicación      | `{ "id": 1, "updateUbicacionDto": { "nombre": "Zona B" } }` |
| `ubicacionesActualizadas` | Emitido tras modificación | *(respuesta array)*                                         |

---

## 📢 Ejemplo de Prueba con Postman WebSocket

1. Abre Postman y selecciona la pestaña **New > WebSocket Request**.
2. En la URL coloca: `ws://localhost:3000`
3. Para enviar un evento:
   - Tipo: `crearSensor`
   - Payload:

```json
{
  "nombre": "Sensor A",
  "tipo": "Humedad"
}
```

4. Para actualizar:
   - Tipo: `actualizarSensor`
   - Payload:

```json
{
  "id": 1,
  "data": {
    "nombre": "Sensor A Modificado",
    "tipo": "Digital"
  }
}
```

5. Para eliminar:
   - Tipo: `eliminarSensor`
   - Payload:

```json
1
```

6. Para crear una ubicación:
   - Tipo: `crearUbicacion`
   - Payload:

```json
{
  "nombre": "Zona Industrial",
  "coordenadas": "-2.14, -79.87"
}
```

7. Agrega un listener para `sensoresActualizados`, `lecturasActualizadas` o `ubicacionesActualizadas` para ver el resultado en vivo.

---

## 📅 Consideraciones

- Usa **SQLite** como base de datos local.
- Las entidades siguen relaciones:
  - Un Sensor tiene muchas Lecturas.
  - Una Lectura pertenece a un Sensor y una Ubicación.
- No usa controladores REST ni GraphQL, solo WebSocket (Socket.IO).

---

## 👨‍💼 Autor

**Emilio Cárdenas**\
Repositorio: [github.com/EmilioSle/APLICACION-PARA-EL-SERVIDOR-WEB](https://github.com/EmilioSle/APLICACION-PARA-EL-SERVIDOR-WEB)
