import { DefensaEntity } from '../../domain/entities/DefensaEntity';

export class DefensaMemoryDataSourceImpl {
  private defensas: DefensaEntity[] = [];

  async create(defensa: DefensaEntity): Promise<DefensaEntity> {
    this.defensas.push(defensa);
    return defensa;
  }

  async getAll(): Promise<DefensaEntity[]> {
    return this.defensas;
  }

  async findById(id: number): Promise<DefensaEntity | null> {
    return this.defensas.find(d => d.id === id) || null;
  }

  async update(defensa: DefensaEntity): Promise<DefensaEntity> {
    const index = this.defensas.findIndex(d => d.id === defensa.id);
    if (index !== -1) {
      this.defensas[index] = defensa;
      return defensa;
    }
    throw new Error('Defensa no encontrada');
  }

  async delete(id: number): Promise<void> {
    this.defensas = this.defensas.filter(d => d.id !== id);
  }
}