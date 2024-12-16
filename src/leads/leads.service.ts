import { leads, setLeads } from './leads.data';

// Obter todos os leads
export const getAllLeads = () => {
  return leads;
};

// Obter um lead por ID
export const getLeadById = (id: number) => {
  return leads.find((lead) => lead.id === id);
};

// Criar um novo lead
export const createLead = (nome: string, email: string, whatsapp: number) => {
  const newLead = {
    id: leads.length ? leads[leads.length - 1].id + 1 : 1,
    nome,
    email,
    whatsapp,
  };
  setLeads([...leads, newLead]);
  return newLead;
};

// Atualizar um lead por ID
export const updateLead = (id: number, data: Partial<{ nome: string; email: string; whatsapp: number }>) => {
  const leadIndex = leads.findIndex((lead) => lead.id === id);
  if (leadIndex === -1) return null;

  leads[leadIndex] = { ...leads[leadIndex], ...data };
  return leads[leadIndex];
};

// Deletar um lead por ID
export const deleteLead = (id: number) => {
  const leadIndex = leads.findIndex((lead) => lead.id === id);
  if (leadIndex === -1) return false;

  const updatedLeads = leads.filter((lead) => lead.id !== id);
  setLeads(updatedLeads);
  return true;
};
