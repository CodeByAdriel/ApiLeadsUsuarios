import { Usuario } from './usuarios.model'; // Importa o modelo Usuario
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Obter todos os usuários
export const getAllUsuarios = async () => {
  return await Usuario.findAll();
};

// Criar um novo usuário
export const createUsuario = async (email: string, senha: string) => {
  const existe = await Usuario.findOne({ where: { email } });
  if (existe) throw new Error('E-mail já está em uso');

  return await Usuario.create({ email, senha });
};

// Login de usuário (gera JWT)
export const loginUsuario = async (email: string, senha: string) => {
  const usuario = await Usuario.findOne({ where: { email, senha } });
  if (!usuario) throw new Error('E-mail ou senha inválidos');

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
};

// Atualizar usuário por ID
export const updateUsuario = async (id: number, data: Partial<{ email: string; senha: string }>) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;

  await usuario.update(data);
  return usuario;
};

// Deletar usuário por ID
export const deleteUsuario = async (id: number) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return false;

  await usuario.destroy();
  return true;
};
