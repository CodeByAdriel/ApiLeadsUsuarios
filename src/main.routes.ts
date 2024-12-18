import express from 'express';
import leadsRoutes from './leads/leads.routes';
import usuariosRoutes from './usuarios/usuarios.routes';

const router = express.Router();

router.use('/leads', leadsRoutes);
router.use('/usuarios', usuariosRoutes);

export default router;
