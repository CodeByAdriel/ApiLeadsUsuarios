import { Request, Response, NextFunction } from 'express';
import * as usuariosService from './usuarios.service';

// Obter todos os usuários
export const getUsuarios = (req: Request, res: Response, next: NextFunction) => {
  try {
    const usuarios = usuariosService.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

// Criar usuário
export const createUsuario = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, senha } = req.body;
    const newUsuario = usuariosService.createUsuario(email, senha);
    res.status(201).json(newUsuario);
  } catch (error) {
    next(error);
  }
};

// Login de usuário
export const loginUsuario = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, senha } = req.body;
    const token = usuariosService.loginUsuario(email, senha);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};

// Atualizar usuário
export const updateUsuario = (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUsuario = usuariosService.updateUsuario(Number(req.params.id), req.body);
    if (!updatedUsuario) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(200).json(updatedUsuario);
  } catch (error) {
    next(error);
  }
};

// Deletar usuário
export const deleteUsuario = (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = usuariosService.deleteUsuario(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
