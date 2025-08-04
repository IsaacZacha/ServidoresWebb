import { Controller, Post, HttpStatus } from '@nestjs/common';
import { SeedService } from '../seeds/seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('init')
  async inicializarDatos() {
    try {
      await this.seedService.seed();
      return {
        statusCode: HttpStatus.OK,
        message: 'Datos de ejemplo creados exitosamente'
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error al crear datos de ejemplo',
        error: error.message
      };
    }
  }
}
