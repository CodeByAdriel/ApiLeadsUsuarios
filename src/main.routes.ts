import express, { Router } from 'express';
import leadsRoutes from './leads/leads.routes';

const router: Router = express.Router();

// Rotas de leads (prefixo /leads)
router.use('/leads', leadsRoutes);

// Outras rotas podem ser adicionadas futuramente:
// router.use('/usuarios', usuariosRoutes);

export default router;
