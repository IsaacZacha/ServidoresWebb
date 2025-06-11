import { DefensaEntity } from '../entities/DefensaEntity';

export abstract class DefensaRepository {
  abstract create(defensa: DefensaEntity): Promise<DefensaEntity>;
  abstract getAll(): Promise<DefensaEntity[]>;
  abstract findById(id: number): Promise<DefensaEntity | null>;
  abstract update(defensa: DefensaEntity): Promise<DefensaEntity>;
  abstract delete(id: number): Promise<void>;
}