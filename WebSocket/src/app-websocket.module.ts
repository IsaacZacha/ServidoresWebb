import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Servicios básicos
import { JsonDataService } from './services/json-data.service';
import { PagoService } from './services/pago.service';
import { PedidoService } from './services/pedido.service';

// Gateways WebSocket
import { PagoGateway } from './gateways/pago.gateway';
import { NotificacionesGateway } from './gateways/notificaciones.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    JsonDataService,
    PagoService,
    PedidoService,
    PagoGateway,
    NotificacionesGateway,
  ],
})
export class AppModule {}
