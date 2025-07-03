import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaService } from './reserva.service';
import { ReservaResolver } from './reserva.resolver';
import { Reserva } from './entities/reserva.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Vehiculo } from '../vehiculo/entities/vehiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Cliente, Vehiculo])],
  providers: [ReservaResolver, ReservaService],
})
export class ReservaModule {}
