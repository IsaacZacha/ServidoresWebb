import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaController } from './reserva.controller';
import { ReservaService } from './reserva.service';
import { Reserva } from './entities/reserva.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Vehiculo } from '../vehiculo/entities/vehiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Cliente, Vehiculo])],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
