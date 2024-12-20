import { Usuario } from './usuarios.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Obter todos os usuários
export const getAllUsuarios = async () => {
  return await Usuario.findAll();
};

// Criar um novo usuário com senha hasheada
export const createUsuario = async (email: string, senha: string) => {
  const existe = await Usuario.findOne({ where: { email } });
  if (existe) throw new Error('E-mail já está em uso');

  const hashedSenha = await bcrypt.hash(senha, 10);
  const newUsuario = await Usuario.create({ email, senha: hashedSenha });

  return {
    id: newUsuario.id,
    email: newUsuario.email,
  };
};

// Login de usuário
export const loginUsuario = async (email: string, senha: string) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error('E-mail ou senha inválidos');

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw new Error('E-mail ou senha inválidos');

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
};

// Atualizar usuário pelo e-mail
export const updateUsuarioPorEmail = async (email: string, data: Partial<{ senha: string }>) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error('Usuário não encontrado.');

  if (data.senha) {
    data.senha = await bcrypt.hash(data.senha, 10); // Hash da nova senha
  }

  await usuario.update(data);

  return {
    id: usuario.id,
    email: usuario.email,
  };
};

// Deletar usuário pelo e-mail
export const deleteUsuarioPorEmail = async (email: string) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new Error('Usuário não encontrado.');

  await usuario.destroy();
  return true;
};
