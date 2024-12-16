import { Request, Response, NextFunction } from 'express';

// Middleware de tratamento de erros
export const errorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
): Response => {
  console.error(`Error: ${err.message}`);

  // Verifica se o erro tem um status (caso seja personalizado)
  const statusCode = err.status || 500;

  // Responde com um JSON estruturado
  return res.status(statusCode).json({
    error: {
      message: err.message || 'Erro interno no servidor.',
      status: statusCode
    }
  });
};
