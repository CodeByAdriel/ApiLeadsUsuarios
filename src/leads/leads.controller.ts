import { Request, Response } from 'express';
import * as LeadService from './leads.service';

// Obter todos os leads
export const getLeads = (req: Request, res: Response): Response => {
  const leads = LeadService.getAllLeads();
  return res.status(200).json(leads);
};

// Obter um lead por ID
export const getLead = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const lead = LeadService.getLeadById(id);

  if (!lead) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  return res.status(200).json(lead);
};

// Criar um novo lead
export const createLead = (req: Request, res: Response): Response => {
  const { nome, email, whatsapp } = req.body;

  const newLead = LeadService.createLead(nome, email, whatsapp);
  return res.status(201).json(newLead);
};

// Atualizar um lead por ID
export const updateLead = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const updatedLead = LeadService.updateLead(id, req.body);

  if (!updatedLead) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  return res.status(200).json(updatedLead);
};

// Deletar um lead por ID
export const deleteLead = (req: Request, res: Response): Response => {
  const id = parseInt(req.params.id);
  const deleted = LeadService.deleteLead(id);

  if (!deleted) {
    return res.status(404).json({ error: 'Lead não encontrado' });
  }

  return res.status(204).send();
};
