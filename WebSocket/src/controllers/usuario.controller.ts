import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { UsuarioService } from '../services/usuario.service';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dtos/usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async crear(@Body() createUsuarioDto: CreateUsuarioDto) {
    const usuario = await this.usuarioService.crear(createUsuarioDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Usuario creado exitosamente',
      data: usuario
    };
  }

  @Get()
  async encontrarTodos() {
    const usuarios = await this.usuarioService.encontrarTodos();
    return {
      statusCode: HttpStatus.OK,
      data: usuarios
    };
  }

  @Get(':id')
  async encontrarPorId(@Param('id', ParseIntPipe) id: number) {
    const usuario = await this.usuarioService.encontrarPorId(id);
    return {
      statusCode: HttpStatus.OK,
      data: usuario
    };
  }

  @Get('email/:email')
  async encontrarPorEmail(@Param('email') email: string) {
    const usuario = await this.usuarioService.encontrarPorEmail(email);
    return {
      statusCode: HttpStatus.OK,
      data: usuario
    };
  }

  @Put(':id')
  async actualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto
  ) {
    const usuario = await this.usuarioService.actualizar(id, updateUsuarioDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario actualizado exitosamente',
      data: usuario
    };
  }

  @Delete(':id')
  async eliminar(@Param('id', ParseIntPipe) id: number) {
    await this.usuarioService.eliminar(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Usuario eliminado exitosamente'
    };
  }
}
