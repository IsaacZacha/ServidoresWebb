import { Router } from 'express';
import { DefensasMemoryController } from './controller.memory';

const controller = new DefensasMemoryController();

export const DefensasMemoryRoutes = Router();
DefensasMemoryRoutes.get('/', controller.getDefensas);
DefensasMemoryRoutes.post('/', controller.createDefensa);
DefensasMemoryRoutes.put('/:id', controller.updateDefensa);
DefensasMemoryRoutes.delete('/:id', controller.deleteDefensa);