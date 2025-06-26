import { DefensaEntity } from '../../entities/DefensaEntity';
import { DefensaRepository } from '../../repositories/defensa.repository';

export interface CreateDefensaUseCase {
  execute(defensa: DefensaEntity): Promise<DefensaEntity>;
}

export class CreateDefensa implements CreateDefensaUseCase {
  constructor(private readonly repository: DefensaRepository) {}

  execute(defensa: DefensaEntity): Promise<DefensaEntity> {
    return this.repository.create(defensa);
  }
}