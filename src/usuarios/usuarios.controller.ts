import { Request, Response, NextFunction } from 'express';
import * as usuariosService from './usuarios.service';

// Obter todos os usuários
export const getUsuarios = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const usuarios = await usuariosService.getAllUsuarios();
    return res.status(200).json({
      message: 'Usuários encontrados com sucesso.',
      data: usuarios,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro desconhecido ao buscar usuários.' });
  }
};

// Criar um novo usuário
export const createUsuario = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { email, senha } = req.body;
    const newUsuario = await usuariosService.createUsuario(email, senha);
    return res.status(201).json({
      message: 'Usuário criado com sucesso.',
      data: newUsuario,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: 'Erro desconhecido ao criar usuário.' });
  }
};

// Login de usuário
export const loginUsuario = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const { email, senha } = req.body;
    const token = await usuariosService.loginUsuario(email, senha);
    return res.status(200).json({
      message: 'Login realizado com sucesso.',
      token,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ error: error.message });
    }
    return res.status(401).json({ error: 'Erro desconhecido ao realizar login.' });
  }
};

// Atualizar usuário por e-mail
export const updateUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, senha } = req.body;
    const updatedUsuario = await usuariosService.updateUsuarioPorEmail(email, { senha });

    return res.status(200).json({
      message: 'Usuário atualizado com sucesso.',
      data: updatedUsuario,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
};

// Deletar usuário por e-mail
export const deleteUsuario = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email } = req.body;
    await usuariosService.deleteUsuarioPorEmail(email);

    return res.status(200).json({
      message: `Usuário com e-mail ${email} deletado com sucesso.`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
};
