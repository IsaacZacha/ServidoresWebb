import { DefensaEntity } from '../../entities/DefensaEntity';
import { DefensaRepository } from '../../repositories/defensa.repository';

export interface UpdateDefensaUseCase {
  execute(defensa: DefensaEntity): Promise<DefensaEntity>;
}

export class UpdateDefensa implements UpdateDefensaUseCase {
  constructor(private readonly repository: DefensaRepository) {}

  execute(defensa: DefensaEntity): Promise<DefensaEntity> {
    return this.repository.update(defensa);
  }
}