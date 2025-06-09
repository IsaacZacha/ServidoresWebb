export interface TodoEntity {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}