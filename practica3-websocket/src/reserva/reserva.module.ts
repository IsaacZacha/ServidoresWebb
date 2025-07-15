import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaService } from './reserva.service';
import { ReservaGateway } from './reserva.gateway';
import { Reserva } from './entities/reserva.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserva]),
  ],
  providers: [ReservaGateway, ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}
