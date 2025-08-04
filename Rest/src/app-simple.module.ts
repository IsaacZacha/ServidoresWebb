import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Servicios
import { JsonDataService } from './services/json-data.service';
import { UsuarioService } from './services/usuario.service';

// Controladores
import { UsuarioController } from './controllers/usuario.controller';

@Module({
  imports: [],
  controllers: [
    AppController, 
    UsuarioController
  ],
  providers: [
    AppService, 
    JsonDataService,
    UsuarioService
  ],
})
export class AppModule {}
