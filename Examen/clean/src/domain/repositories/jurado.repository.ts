import { JuradoEntity } from '../entities/JuradoEntity';

export abstract class JuradoRepository {
  abstract create(jurado: JuradoEntity): Promise<JuradoEntity>;
  abstract getAll(): Promise<JuradoEntity[]>;
  abstract findById(id: number): Promise<JuradoEntity | null>;
  abstract update(jurado: JuradoEntity): Promise<JuradoEntity>;
  abstract delete(id: number): Promise<void>;
}