import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { Usuario } from '../entities/usuario.entity';
import { CreateUsuarioDto, UpdateUsuarioDto } from '../dtos/usuario.dto';
import { JsonDataService } from './json-data.service';

@Injectable()
export class UsuarioService {
  constructor(
    private readonly jsonDataService: JsonDataService,
  ) {}

  async crear(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuarioExistente = this.jsonDataService.findOneBy('usuarios', {
      correoElectronico: createUsuarioDto.correoElectronico
    });

    if (usuarioExistente) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    return this.jsonDataService.create('usuarios', createUsuarioDto);
  }

  async encontrarTodos(): Promise<Usuario[]> {
    return this.jsonDataService.findAll('usuarios');
  }

  async encontrarPorId(id: number): Promise<Usuario> {
    const usuario = this.jsonDataService.findById('usuarios', id);

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuario;
  }

  async encontrarPorEmail(correoElectronico: string): Promise<Usuario> {
    const usuario = this.jsonDataService.findOneBy('usuarios', { correoElectronico });

    if (!usuario) {
      throw new NotFoundException(`Usuario con email ${correoElectronico} no encontrado`);
    }

    return usuario;
  }

  async actualizar(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuarioExistente = this.jsonDataService.findById('usuarios', id);
    
    if (!usuarioExistente) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const usuarioActualizado = this.jsonDataService.update('usuarios', id, updateUsuarioDto);
    
    if (!usuarioActualizado) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    return usuarioActualizado;
  }

  async eliminar(id: number): Promise<void> {
    const usuario = this.jsonDataService.findById('usuarios', id);
    
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const eliminado = this.jsonDataService.delete('usuarios', id);
    
    if (!eliminado) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
  }
}
