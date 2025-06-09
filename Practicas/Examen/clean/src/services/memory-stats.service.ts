import { DatasourceConfig } from '../infrastructure/datasource/datasource.config';

export class MemoryStatsService {
  async getStats() {
    const datasource: any = DatasourceConfig.getDatasource();
    if (!datasource.getAll) return { error: 'Datasource not compatible' };

    const todos = await datasource.getAll();
    const totalTodos = todos.length;
    const completedTodos = todos.filter((t: any) => t.completed).length;
    const pendingTodos = totalTodos - completedTodos;
    const nextId = todos.length > 0 ? Math.max(...todos.map((t: any) => t.id)) + 1 : 1;

    return {
      datasourceType: 'MEMORY',
      totalTodos,
      completedTodos,
      pendingTodos,
      nextId
    };
  }
}