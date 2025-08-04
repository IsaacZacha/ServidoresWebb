import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';
import { CreatePedidoConEntradasDto } from '../dtos/pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async crear(@Body() createPedidoDto: CreatePedidoConEntradasDto) {
    const pedido = await this.pedidoService.crear(createPedidoDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Pedido creado exitosamente',
      data: pedido
    };
  }

  @Get()
  async encontrarTodos() {
    const pedidos = await this.pedidoService.encontrarTodos();
    return {
      statusCode: HttpStatus.OK,
      data: pedidos
    };
  }

  @Get(':id')
  async encontrarPorId(@Param('id', ParseIntPipe) id: number) {
    const pedido = await this.pedidoService.encontrarPorId(id);
    return {
      statusCode: HttpStatus.OK,
      data: pedido
    };
  }

  @Get('usuario/:usuarioId')
  async encontrarPorUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    const pedidos = await this.pedidoService.encontrarPorUsuario(usuarioId);
    return {
      statusCode: HttpStatus.OK,
      data: pedidos
    };
  }

  @Put(':id/confirmar')
  async confirmar(@Param('id', ParseIntPipe) id: number) {
    const pedido = await this.pedidoService.confirmar(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Pedido confirmado exitosamente',
      data: pedido
    };
  }

  @Put(':id/cancelar')
  async cancelar(@Param('id', ParseIntPipe) id: number) {
    const pedido = await this.pedidoService.cancelar(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Pedido cancelado exitosamente',
      data: pedido
    };
  }
}
