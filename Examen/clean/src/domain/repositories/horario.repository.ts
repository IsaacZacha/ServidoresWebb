import { HorarioEntity } from '../entities/HorarioEntity';

export abstract class HorarioRepository {
  abstract create(horario: HorarioEntity): Promise<HorarioEntity>;
  abstract getAll(): Promise<HorarioEntity[]>;
  abstract findById(id: number): Promise<HorarioEntity | null>;
  abstract update(horario: HorarioEntity): Promise<HorarioEntity>;
  abstract delete(id: number): Promise<void>;
}