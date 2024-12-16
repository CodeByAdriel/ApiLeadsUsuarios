import express, { Router } from 'express';
import leadsRoutes from './leads/leads.routes';
import usuariosRoutes from './usuarios/usuarios.routes';

const router: Router = express.Router();

// Rotas de leads (prefixo /leads)
router.use('/leads', leadsRoutes);
router.use('/usuarios', usuariosRoutes)

export default router;
