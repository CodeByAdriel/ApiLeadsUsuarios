import * as leadsService from '../leads/leads.service';
import { Lead } from '../leads/leads.model';

jest.mock('../leads/leads.model'); // Mocka o model Sequelize

describe('Leads Service', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  it('deve retornar todos os leads', async () => {
    (Lead.findAll as jest.Mock).mockResolvedValue([
      { id: 1, nome: 'João Silva', email: 'joao@gmail.com', whatsapp: 71912345678 },
      { id: 2, nome: 'Maria Souza', email: 'maria@gmail.com', whatsapp: 71998765432 },
    ]);

    const result = await leadsService.getAllLeads();
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: 1, nome: 'João Silva', email: 'joao@gmail.com', whatsapp: 71912345678 },
      { id: 2, nome: 'Maria Souza', email: 'maria@gmail.com', whatsapp: 71998765432 },
    ]);
  });

  it('deve retornar um lead pelo ID', async () => {
    (Lead.findByPk as jest.Mock).mockResolvedValue({
      id: 1,
      nome: 'João Silva',
      email: 'joao@gmail.com',
      whatsapp: 71912345678,
    });

    const result = await leadsService.getLeadById(1);
    expect(result).toEqual({
      id: 1,
      nome: 'João Silva',
      email: 'joao@gmail.com',
      whatsapp: 71912345678,
    });
  });

  it('deve retornar null para um ID inexistente', async () => {
    (Lead.findByPk as jest.Mock).mockResolvedValue(null);

    const result = await leadsService.getLeadById(99);
    expect(result).toBeNull();
  });

  it('deve criar um novo lead', async () => {
    (Lead.create as jest.Mock).mockResolvedValue({
      id: 3,
      nome: 'Carlos Lima',
      email: 'carlos@gmail.com',
      whatsapp: 71945678912,
    });

    const result = await leadsService.createLead('Carlos Lima', 'carlos@gmail.com', 71945678912);
    expect(result).toEqual({
      id: 3,
      nome: 'Carlos Lima',
      email: 'carlos@gmail.com',
      whatsapp: 71945678912,
    });
  });

  it('deve atualizar um lead existente', async () => {
    const mockLead = {
      id: 1,
      nome: 'João Silva',
      email: 'joao@gmail.com',
      whatsapp: 71912345678,
      update: jest.fn(function (this: any, data) {
        // Simula a atualização dos dados
        Object.assign(this, data);
        return Promise.resolve(this);
      }),
    };
  
    (Lead.findByPk as jest.Mock).mockResolvedValue(mockLead);
  
    const result = await leadsService.updateLead(1, { nome: 'João Santos' });
  
    expect(result).toEqual(
      expect.objectContaining({
        id: 1,
        nome: 'João Santos', // Nome atualizado
        email: 'joao@gmail.com',
        whatsapp: 71912345678,
      })
    );
  
    expect(mockLead.update).toHaveBeenCalledWith({ nome: 'João Santos' });
  });
  

  it('deve retornar null ao tentar atualizar um ID inexistente', async () => {
    (Lead.findByPk as jest.Mock).mockResolvedValue(null);

    const result = await leadsService.updateLead(99, { nome: 'Nome Não Existente' });
    expect(result).toBeNull();
  });

  it('deve deletar um lead existente', async () => {
    const mockLead = { destroy: jest.fn() };

    (Lead.findByPk as jest.Mock).mockResolvedValue(mockLead);

    const result = await leadsService.deleteLead(1);
    expect(result).toBe(true);
    expect(mockLead.destroy).toHaveBeenCalled();
  });

  it('deve retornar false ao tentar deletar um ID inexistente', async () => {
    (Lead.findByPk as jest.Mock).mockResolvedValue(null);

    const result = await leadsService.deleteLead(99);
    expect(result).toBe(false);
  });
});
