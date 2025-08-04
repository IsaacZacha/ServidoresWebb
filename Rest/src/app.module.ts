import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Servicios
import { JsonDataService } from './services/json-data.service';
import { UsuarioService } from './services/usuario.service';
import { EventoService } from './services/evento.service';
import { UbicacionService } from './services/ubicacion.service';
import { PedidoService } from './services/pedido.service';
import { PagoService } from './services/pago.service';

// Controladores
import { UsuarioController } from './controllers/usuario.controller';
import { EventoController } from './controllers/evento.controller';
import { UbicacionController } from './controllers/ubicacion.controller';
import { PedidoController } from './controllers/pedido.controller';
import { PagoController } from './controllers/pago.controller';
import { SeleccionController } from './controllers/seleccion.controller';

@Module({
  imports: [],
  controllers: [
    AppController, 
    UsuarioController,
    EventoController,
    UbicacionController,
    PedidoController,
    PagoController,
    SeleccionController
  ],
  providers: [
    AppService, 
    JsonDataService,
    UsuarioService,
    EventoService,
    UbicacionService,
    PedidoService,
    PagoService
  ],
})
export class AppModule {}
