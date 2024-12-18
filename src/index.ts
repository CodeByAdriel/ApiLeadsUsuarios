import express from 'express';
import mainRouter from './main.routes'; // Importa o arquivo principal de rotas
import { errorHandler } from './middlewares/errorHandler.middleware';
import { sequelize } from './models'; 

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware para JSON

// Testar conexão com o banco
sequelize.sync({ alter: true }).then(() => {
  console.log('Banco de dados sincronizado com sucesso!');
}).catch((error) => {
  console.error('Erro ao sincronizar o banco de dados:', error);
});

// Middleware principal de rotas
app.use('/', mainRouter);

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
