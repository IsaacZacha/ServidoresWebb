import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './cliente.service';
import { ClienteResolver } from './cliente.resolver';
import { Cliente } from './entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  providers: [ClienteResolver, ClienteService],
  exports: [ClienteService],
})
export class ClienteModule {}
