import jwt from 'jsonwebtoken';
import { usuarios, setUsuarios } from './usuarios.data';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Obter todos os usuários (apenas para testes, em produção não exporíamos senhas)
export const getAllUsuarios = () => {
  return usuarios;
};

// Obter um usuário por ID
export const getUsuarioById = (id: number) => {
  return usuarios.find((usuario) => usuario.id === id);
};

// Criar um novo usuário
export const createUsuario = (email: string, senha: string) => {
  if (usuarios.find((usuario) => usuario.email === email)) {
    throw new Error('E-mail já está em uso');
  }

  const newUsuario = {
    id: usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1,
    email,
    senha, // No futuro, faremos hash da senha
  };

  setUsuarios([...usuarios, newUsuario]);
  return newUsuario;
};

// Atualizar usuário por ID
export const updateUsuario = (id: number, data: Partial<{ email: string; senha: string }>) => {
  const usuarioIndex = usuarios.findIndex((usuario) => usuario.id === id);
  if (usuarioIndex === -1) return null;

  usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...data };
  return usuarios[usuarioIndex];
};

// Deletar usuário por ID
export const deleteUsuario = (id: number) => {
  const usuarioIndex = usuarios.findIndex((usuario) => usuario.id === id);
  if (usuarioIndex === -1) return false;

  const updatedUsuarios = usuarios.filter((usuario) => usuario.id !== id);
  setUsuarios(updatedUsuarios);
  return true;
};

// Login de usuário (gera JWT)
export const loginUsuario = (email: string, senha: string) => {
  const usuario = usuarios.find((usuario) => usuario.email === email && usuario.senha === senha);
  if (!usuario) {
    throw new Error('E-mail ou senha inválidos');
  }

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
};
