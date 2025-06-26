import { Router } from 'express';
import { DefensasMemoryRoutes } from './routes.memory';

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        // Monta las rutas de defensas en memoria bajo /defensas-memory
        router.use('/defensas-memory', DefensasMemoryRoutes);

        return router;
    }
}