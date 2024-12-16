export let leads = [
    {
      id: 1,
      nome: 'João Silva',
      email: 'joao@gmail.com',
      whatsapp: 71912345678,
    },
    {
      id: 2,
      nome: 'Maria Souza',
      email: 'maria@gmail.com',
      whatsapp: 71998765432,
    },
  ];
  
  // Função para atualizar o array de leads
  export const setLeads = (newLeads: typeof leads) => {
    leads = newLeads;
  };
  