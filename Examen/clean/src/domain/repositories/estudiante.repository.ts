import { EstudianteEntity } from '../entities/EstudianteEntity';

export abstract class EstudianteRepository {
  abstract create(estudiante: EstudianteEntity): Promise<EstudianteEntity>;
  abstract getAll(): Promise<EstudianteEntity[]>;
  abstract findById(id: number): Promise<EstudianteEntity | null>;
  abstract update(estudiante: EstudianteEntity): Promise<EstudianteEntity>;
  abstract delete(id: number): Promise<void>;
}