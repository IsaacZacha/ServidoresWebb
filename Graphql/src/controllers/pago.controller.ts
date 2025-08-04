import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { PagoService } from '../services/pago.service';
import { CreatePagoDto } from '../dtos/pago.dto';

@Controller('pagos')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  async crear(@Body() createPagoDto: CreatePagoDto) {
    const pago = await this.pagoService.crear(createPagoDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Pago creado exitosamente',
      data: pago
    };
  }

  @Put(':id/procesar')
  async procesar(@Param('id', ParseIntPipe) id: number) {
    const pago = await this.pagoService.procesar(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Pago procesado exitosamente',
      data: pago
    };
  }

  @Get(':id')
  async encontrarPorId(@Param('id', ParseIntPipe) id: number) {
    const pago = await this.pagoService.encontrarPorId(id);
    return {
      statusCode: HttpStatus.OK,
      data: pago
    };
  }

  @Get('pedido/:pedidoId')
  async encontrarPorPedido(@Param('pedidoId', ParseIntPipe) pedidoId: number) {
    const pago = await this.pagoService.encontrarPorPedido(pedidoId);
    return {
      statusCode: HttpStatus.OK,
      data: pago
    };
  }

  @Put(':id/reembolsar')
  async reembolsar(@Param('id', ParseIntPipe) id: number) {
    const pago = await this.pagoService.reembolsar(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Reembolso procesado exitosamente',
      data: pago
    };
  }
}
