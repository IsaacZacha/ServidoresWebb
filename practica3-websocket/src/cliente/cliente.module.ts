import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { ClienteGateway } from './cliente.gateway';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]),
  ],
  providers: [ClienteGateway, ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
