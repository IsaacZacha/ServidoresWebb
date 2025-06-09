import { DefensaEntity } from '../../domain/entities/DefensaEntity';
import { DefensaRepository } from '../../domain/repositories/defensa.repository';
import { DefensaMemoryDataSourceImpl } from '../datasource/defensa.memory.datasource.impl';

export class TodoMemoryDatasourceImpl extends DefensaRepository {
  constructor(private readonly datasource: DefensaMemoryDataSourceImpl) {
    super();
  }

  create(defensa: DefensaEntity): Promise<DefensaEntity> {
    return this.datasource.create(defensa);
  }

  getAll(): Promise<DefensaEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<DefensaEntity | null> {
    return this.datasource.findById(id);
  }

  update(defensa: DefensaEntity): Promise<DefensaEntity> {
    return this.datasource.update(defensa);
  }

  delete(id: number): Promise<void> {
    return this.datasource.delete(id);
  }
}