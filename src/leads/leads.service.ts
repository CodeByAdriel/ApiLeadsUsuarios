import { Lead } from './leads.model'; // Importa o modelo Lead

// Obter todos os leads
export const getAllLeads = async () => {
  return await Lead.findAll();
};

// Obter um lead por ID
export const getLeadById = async (id: number) => {
  return await Lead.findByPk(id);
};

// Criar um novo lead
export const createLead = async (nome: string, email: string, whatsapp: number) => {
  return await Lead.create({ nome, email, whatsapp });
};

// Atualizar um lead por ID
export const updateLead = async (id: number, data: Partial<{ nome: string; email: string; whatsapp: number }>) => {
  const lead = await Lead.findByPk(id);
  if (!lead) return null;

  await lead.update(data);
  return lead;
};

// Deletar um lead por ID
export const deleteLead = async (id: number): Promise<boolean> => {
  const lead = await Lead.findByPk(id);
  if (!lead) return false;

  await lead.destroy();
  return true;
};
