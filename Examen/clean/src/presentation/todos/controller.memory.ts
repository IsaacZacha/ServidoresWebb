import { Request, Response } from 'express';
import { GetDefensas } from '../../domain/use-cases/todo/get-todos';
import { DefensaRepositoryImpl } from '../../infrastructure/repositories/defensa.repository.impl';
import { DefensaMemoryDataSourceImpl } from '../../infrastructure/datasource/defensa.memory.datasource.impl';
// Asegúrate de tener estos casos de uso:
import { CreateDefensa } from '../../domain/use-cases/todo/create-todo';
import { UpdateDefensa } from '../../domain/use-cases/todo/update-todo';
import { DeleteDefensa } from '../../domain/use-cases/todo/delete-todo';

export class DefensasMemoryController {
  private defensaRepository: DefensaRepositoryImpl;

  constructor() {
    const datasource = new DefensaMemoryDataSourceImpl();
    this.defensaRepository = new DefensaRepositoryImpl(datasource);
  }

  public getDefensas = (req: Request, res: Response) => {
    new GetDefensas(this.defensaRepository)
      .execute()
      .then(defensas => res.json(defensas))
      .catch(error => res.status(400).json({ error }));
  };

  public createDefensa = (req: Request, res: Response) => {
    // Aquí podrías validar el body si tienes un DTO
    new CreateDefensa(this.defensaRepository)
      .execute(req.body)
      .then(defensa => res.json(defensa))
      .catch(error => res.status(400).json({ error }));
  };

  public updateDefensa = (req: Request, res: Response) => {
    const id = +req.params.id;
    const defensaActualizada = { ...req.body, id };
    new UpdateDefensa(this.defensaRepository)
      .execute(defensaActualizada)
      .then(defensa => res.json(defensa))
      .catch(error => res.status(400).json({ error }));
  };

  public deleteDefensa = (req: Request, res: Response) => {
    const id = +req.params.id;
    new DeleteDefensa(this.defensaRepository)
      .execute(id)
      .then(() => res.json({ message: 'Defensa eliminada' }))
      .catch(error => res.status(400).json({ error }));
  };
}