import { Sequelize } from 'sequelize';
import { initLeadModel, Lead } from '../leads/leads.model';
import { initUsuarioModel, Usuario } from '../usuarios/usuarios.model';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do .env

// Configuração do Sequelize usando variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_DATABASE as string,     // Nome do banco de dados
  process.env.DB_USERNAME as string,     // Usuário do banco
  process.env.DB_PASSWORD as string,     // Senha do banco
  {
    host: process.env.DB_HOST,           // Host do banco
    port: Number(process.env.DB_PORT),   // Porta do banco (conversão para número)
    dialect: 'postgres',                 // Dialeto do banco
    logging: false,                      // Desativa logs SQL
  }
);

// Inicializar Models
initLeadModel(sequelize);
initUsuarioModel(sequelize);

// Exporta os models e a instância Sequelize
export { sequelize, Lead, Usuario };
