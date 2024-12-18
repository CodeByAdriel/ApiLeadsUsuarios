import { Request, Response } from 'express';
import * as LeadService from './leads.service';

// Obter todos os leads
export const getLeads = async (req: Request, res: Response): Promise<Response> => {
  try {
    const leads = await LeadService.getAllLeads();
    return res.status(200).json(leads);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar leads' });
  }
};

// Obter um lead por ID
export const getLead = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const lead = await LeadService.getLeadById(id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead não encontrado' });
    }

    return res.status(200).json(lead);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar lead' });
  }
};

// Criar um novo lead
export const createLead = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { nome, email, whatsapp } = req.body;
    const newLead = await LeadService.createLead(nome, email, whatsapp);
    return res.status(201).json(newLead);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar lead' });
  }
};

// Atualizar um lead por ID
export const updateLead = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const updatedLead = await LeadService.updateLead(id, req.body);

    if (!updatedLead) {
      return res.status(404).json({ error: 'Lead não encontrado' });
    }

    return res.status(200).json(updatedLead);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar lead' });
  }
};

// Deletar um lead por ID
export const deleteLead = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await LeadService.deleteLead(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Lead não encontrado' });
    }

    return res.status(200).json({ message: `Lead ${id} deletado com sucesso.` });
  } catch (error) {
    console.error('Erro ao deletar lead:', error);
    return res.status(500).json({ error: 'Erro ao deletar lead' });
  }
};
