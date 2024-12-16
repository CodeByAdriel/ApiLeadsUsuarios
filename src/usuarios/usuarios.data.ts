export let usuarios = [
    {
      id: 1,
      email: 'joao@gmail.com',
      senha: '123456', // No futuro, será hash (bcrypt)
    },
  ];
  
  // Função para atualizar o array de usuários
  export const setUsuarios = (newUsuarios: typeof usuarios) => {
    usuarios = newUsuarios;
  };
  