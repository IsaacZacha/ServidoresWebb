import { AulaEntity } from '../entities/AulaEntity';

export abstract class AulaRepository {
  abstract create(aula: AulaEntity): Promise<AulaEntity>;
  abstract getAll(): Promise<AulaEntity[]>;
  abstract findById(id: number): Promise<AulaEntity | null>;
  abstract update(aula: AulaEntity): Promise<AulaEntity>;
  abstract delete(id: number): Promise<void>;
}