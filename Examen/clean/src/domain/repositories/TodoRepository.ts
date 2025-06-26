import { TodoEntity } from '../entities/TodoEntity';

export abstract class TodoRepository {
  abstract create(todo: TodoEntity): Promise<TodoEntity>;
  abstract getAll(): Promise<TodoEntity[]>;
  abstract findById(id: number): Promise<TodoEntity | null>;
  abstract updateById(id: number, values: Partial<TodoEntity>): Promise<TodoEntity | null>;
  abstract deleteById(id: number): Promise<void>;
}