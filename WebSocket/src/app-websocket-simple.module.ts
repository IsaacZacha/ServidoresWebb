import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Servicios básicos
import { JsonDataService } from './services/json-data.service';
import { PagoService } from './services/pago.service';
import { PedidoService } from './services/pedido.service';

// Gateways WebSocket básicos
import { PagoGateway } from './gateways/pago.gateway';

@Module({
  imports: [],
  controllers: [
    AppController
  ],
  providers: [
    AppService, 
    JsonDataService,
    PedidoService,
    PagoService,
    PagoGateway
  ],
})
export class AppWebSocketModule {}
