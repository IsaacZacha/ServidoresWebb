import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoController } from './vehiculo.controller';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './entities/vehiculo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo])],
  controllers: [VehiculoController],
  providers: [VehiculoService],
  exports: [VehiculoService],
})
export class VehiculoModule {}
