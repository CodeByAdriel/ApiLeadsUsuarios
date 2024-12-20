import express from 'express';
import * as usuariosController from './usuarios.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = express.Router();

// Rotas públicas
router.post('/login', usuariosController.loginUsuario);
router.post('/', usuariosController.createUsuario);

// Rotas protegidas
router.put('/', authenticateJWT, usuariosController.updateUsuario);
router.delete('/:id', authenticateJWT, usuariosController.deleteUsuario);

export default router;
