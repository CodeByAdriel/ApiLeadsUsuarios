import * as leadsService from '../leads/leads.service';
import { leads, setLeads } from '../leads/leads.data';

describe('Leads Service', () => {
  beforeEach(() => {
    // Reseta o array de leads para os dados iniciais antes de cada teste
    setLeads([
      { id: 1, nome: 'João Silva', email: 'joao@gmail.com', whatsapp: 71912345678 },
      { id: 2, nome: 'Maria Souza', email: 'maria@gmail.com', whatsapp: 71998765432 },
    ]);
  });

  it('deve retornar todos os leads', () => {
    const result = leadsService.getAllLeads();
    expect(result).toHaveLength(2);
    expect(result).toEqual(leads);
  });

  it('deve retornar um lead pelo ID', () => {
    const result = leadsService.getLeadById(1);
    expect(result).toEqual({ id: 1, nome: 'João Silva', email: 'joao@gmail.com', whatsapp: 71912345678 });
  });

  it('deve retornar null para um ID inexistente', () => {
    const result = leadsService.getLeadById(99);
    expect(result).toBeUndefined();
  });

  it('deve criar um novo lead', () => {
    const newLead = leadsService.createLead('Carlos Lima', 'carlos@gmail.com', 71945678912);
    expect(newLead).toEqual({ id: 3, nome: 'Carlos Lima', email: 'carlos@gmail.com', whatsapp: 71945678912 });
    expect(leads).toHaveLength(3);
  });

  it('deve atualizar um lead existente', () => {
    const updatedLead = leadsService.updateLead(1, { nome: 'João Santos' });
    expect(updatedLead).toEqual({ id: 1, nome: 'João Santos', email: 'joao@gmail.com', whatsapp: 71912345678 });
  });

  it('deve retornar null ao tentar atualizar um ID inexistente', () => {
    const result = leadsService.updateLead(99, { nome: 'Nome Não Existente' });
    expect(result).toBeNull();
  });

  it('deve deletar um lead existente', () => {
    const result = leadsService.deleteLead(1);
    expect(result).toBe(true);
    expect(leads).toHaveLength(1);
  });

  it('deve retornar false ao tentar deletar um ID inexistente', () => {
    const result = leadsService.deleteLead(99);
    expect(result).toBe(false);
  });
});
