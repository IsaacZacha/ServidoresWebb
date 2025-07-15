import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoService } from './vehiculo.service';
import { VehiculoGateway } from './vehiculo.gateway';
import { Vehiculo } from './entities/vehiculo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehiculo]),
  ],
  providers: [VehiculoGateway, VehiculoService],
  exports: [VehiculoService],
})
export class VehiculoModule {}
