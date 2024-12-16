import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

// Middleware genérico para validar dados
export const validateSchema = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => detail.message);
      res.status(400).json({ errors });
    } else {
      next();
    }
  };
};
