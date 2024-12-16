import express, { Request, Response, NextFunction } from 'express';
import mainRouter from './main.routes';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Rotas principais
app.use('/', mainRouter);

// Middleware de rota não encontrada
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Rota não encontrada');
  (error as any).status = 404; // Adiciona o status HTTP 404 ao erro
  next(error);
});

// Middleware de tratamento de erros
app.use(errorHandler);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
