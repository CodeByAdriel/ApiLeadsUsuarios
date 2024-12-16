import Joi from 'joi';

// Schema para criação de um novo lead (POST)
export const createLeadSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required().messages({
    'string.base': '"nome" deve ser um texto.',
    'string.empty': '"nome" não pode estar vazio.',
    'string.min': '"nome" deve ter pelo menos {#limit} caracteres.',
    'string.max': '"nome" deve ter no máximo {#limit} caracteres.',
    'any.required': '"nome" é obrigatório.'
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" deve ser um endereço de e-mail válido.',
    'any.required': '"email" é obrigatório.'
  }),
  whatsapp: Joi.number().integer().min(1000000000).required().messages({
    'number.base': '"whatsapp" deve ser um número.',
    'number.min': '"whatsapp" deve ter pelo menos 10 dígitos.',
    'any.required': '"whatsapp" é obrigatório.'
  })
});

// Schema para atualização de um lead (PUT)
export const updateLeadSchema = Joi.object({
  nome: Joi.string().min(3).max(100).optional(),
  email: Joi.string().email().optional(),
  whatsapp: Joi.number().integer().min(1000000000).optional()
}).or('nome', 'email', 'whatsapp').messages({
  'object.missing': 'Pelo menos um dos campos ("nome", "email" ou "whatsapp") deve ser enviado.'
});
