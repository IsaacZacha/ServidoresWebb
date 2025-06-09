import { DefensaEntity } from '../../entities/DefensaEntity';
import { DefensaRepository } from '../../repositories/defensa.repository';

export interface GetDefensaUseCase {
  execute(id: number): Promise<DefensaEntity | null>;
}

export class GetDefensa implements GetDefensaUseCase {
  constructor(private readonly repository: DefensaRepository) {}

  execute(id: number): Promise<DefensaEntity | null> {
    return this.repository.findById(id);
  }
}