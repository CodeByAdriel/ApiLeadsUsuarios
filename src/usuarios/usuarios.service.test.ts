import * as usuariosService from '../usuarios/usuarios.service';
import { usuarios, setUsuarios } from '../usuarios/usuarios.data';

describe('Usuários Service', () => {
  beforeEach(() => {
    // Reseta o array de usuários antes de cada teste
    setUsuarios([{ id: 1, email: 'joao@gmail.com', senha: '123456' }]);
  });

  it('deve retornar todos os usuários', () => {
    const result = usuariosService.getAllUsuarios();
    expect(result).toHaveLength(1);
    expect(result).toEqual(usuarios);
  });

  it('deve criar um novo usuário', () => {
    const newUsuario = usuariosService.createUsuario('maria@gmail.com', '654321');
    expect(newUsuario).toEqual({ id: 2, email: 'maria@gmail.com', senha: '654321' });
    expect(usuarios).toHaveLength(2);
  });

  it('deve lançar erro ao criar um usuário com e-mail existente', () => {
    expect(() => {
      usuariosService.createUsuario('joao@gmail.com', '654321');
    }).toThrow('E-mail já está em uso');
  });

  it('deve retornar null ao tentar atualizar um ID inexistente', () => {
    const result = usuariosService.updateUsuario(99, { email: 'naoexiste@gmail.com' });
    expect(result).toBeNull();
  });

  it('deve deletar um usuário existente', () => {
    const result = usuariosService.deleteUsuario(1);
    expect(result).toBe(true);
    expect(usuarios).toHaveLength(0);
  });

  it('deve retornar false ao tentar deletar um ID inexistente', () => {
    const result = usuariosService.deleteUsuario(99);
    expect(result).toBe(false);
  });

  it('deve realizar login com e-mail e senha válidos', () => {
    const result = usuariosService.loginUsuario('joao@gmail.com', '123456');
    expect(result).toHaveProperty('token');
  });

  it('deve lançar erro ao realizar login com e-mail ou senha inválidos', () => {
    expect(() => {
      usuariosService.loginUsuario('joao@gmail.com', 'senhaerrada');
    }).toThrow('E-mail ou senha inválidos');
  });
});
