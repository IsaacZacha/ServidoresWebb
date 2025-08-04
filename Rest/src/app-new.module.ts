import { Module } from '@nestjs/common';
import { JsonDataService } from './services/json-data.service';
import { UsuarioService } from './services/usuario.service';
import { EventoService } from './services/evento.service';
import { UbicacionService } from './services/ubicacion.service';
import { PedidoService } from './services/pedido.service';
import { PagoService } from './services/pago.service';
import { UsuarioController } from './controllers/usuario.controller';
import { EventoController } from './controllers/evento.controller';
import { UbicacionController } from './controllers/ubicacion.controller';
import { PedidoController } from './controllers/pedido.controller';
import { PagoController } from './controllers/pago.controller';

@Module({
  providers: [
    JsonDataService,
    UsuarioService,
    EventoService,
    UbicacionService,
    PedidoService,
    PagoService,
  ],
  controllers: [
    UsuarioController,
    EventoController,
    UbicacionController,
    PedidoController,
    PagoController,
  ],
})
export class AppModule {}
