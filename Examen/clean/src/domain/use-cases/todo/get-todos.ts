import { DefensaEntity } from '../../entities/DefensaEntity';
import { DefensaRepository } from '../../repositories/defensa.repository';

export interface GetDefensasUseCase {
  execute(): Promise<DefensaEntity[]>;
}

export class GetDefensas implements GetDefensasUseCase {
  constructor(private readonly repository: DefensaRepository) {}

  execute(): Promise<DefensaEntity[]> {
    return this.repository.getAll();
  }
}