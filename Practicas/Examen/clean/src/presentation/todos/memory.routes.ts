import { Router } from 'express';
import { MemoryStatsService } from '../../services/memory-stats.service';

export const MemoryAuxRoutes = Router();
const statsService = new MemoryStatsService();

MemoryAuxRoutes.get('/stats', async (req, res) => {
  const stats = await statsService.getStats();
  res.json(stats);
});