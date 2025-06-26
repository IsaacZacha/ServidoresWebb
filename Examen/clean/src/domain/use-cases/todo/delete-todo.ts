import { DefensaRepository } from '../../repositories/defensa.repository';

export interface DeleteDefensaUseCase {
  execute(id: number): Promise<void>;
}

export class DeleteDefensa implements DeleteDefensaUseCase {
  constructor(private readonly repository: DefensaRepository) {}

  execute(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
