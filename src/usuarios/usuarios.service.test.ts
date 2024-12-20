import * as usuariosService from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/usuarios.model';
import jwt from 'jsonwebtoken';

jest.mock('../usuarios/usuarios.model'); // Mock do model Sequelize
jest.mock('jsonwebtoken'); // Mock do JWT

describe('Usuários Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar todos os usuários', async () => {
    (Usuario.findAll as jest.Mock).mockResolvedValue([
      { id: 1, email: 'joao@gmail.com', senha: '123456' },
    ]);

    const result = await usuariosService.getAllUsuarios();
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ id: 1, email: 'joao@gmail.com', senha: '123456' });
  });

  it('deve criar um novo usuário', async () => {
    (Usuario.findOne as jest.Mock).mockResolvedValue(null); // Não existe usuário com o e-mail
    (Usuario.create as jest.Mock).mockResolvedValue({
      id: 2,
      email: 'maria@gmail.com',
      senha: '654321',
    });

    const result = await usuariosService.createUsuario('maria@gmail.com', '654321');
    expect(result).toEqual({ id: 2, email: 'maria@gmail.com', senha: '654321' });
  });

  it('deve lançar erro ao criar um usuário com e-mail existente', async () => {
    (Usuario.findOne as jest.Mock).mockResolvedValue({ email: 'joao@gmail.com' });

    await expect(usuariosService.createUsuario('joao@gmail.com', '654321')).rejects.toThrow(
      'E-mail já está em uso'
    );
  });

  it('deve lançar erro ao realizar login com e-mail ou senha inválidos', async () => {
    (Usuario.findOne as jest.Mock).mockResolvedValue(null);

    await expect(usuariosService.loginUsuario('joao@gmail.com', 'senhaerrada')).rejects.toThrow(
      'E-mail ou senha inválidos'
    );
  });

  it('deve realizar login com e-mail e senha válidos', async () => {
    (Usuario.findOne as jest.Mock).mockResolvedValue({ id: 1, email: 'joao@gmail.com', senha: '123456' });
    (jwt.sign as jest.Mock).mockReturnValue('mocked_token');

    const result = await usuariosService.loginUsuario('joao@gmail.com', '123456');
    expect(result).toBe('mocked_token');
  });

  it('deve atualizar um usuário existente', async () => {
    const mockUsuario = { update: jest.fn(), id: 1, email: 'joao@gmail.com' };
    (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);

    const result = await usuariosService.updateUsuario(1, { email: 'novoemail@gmail.com' });
    expect(result).toEqual(mockUsuario);
    expect(mockUsuario.update).toHaveBeenCalledWith({ email: 'novoemail@gmail.com' });
  });

  it('deve retornar erro ao tentar atualizar um ID inexistente', async () => {
    (Usuario.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(
      usuariosService.updateUsuario(99, { email: 'naoexiste@gmail.com' })
    ).rejects.toThrow('Usuário não encontrado');
  });

  it('deve deletar um usuário existente', async () => {
    const mockUsuario = { destroy: jest.fn() };
    (Usuario.findByPk as jest.Mock).mockResolvedValue(mockUsuario);

    const result = await usuariosService.deleteUsuario(1);
    expect(result).toBe(true);
    expect(mockUsuario.destroy).toHaveBeenCalled();
  });

  it('deve retornar erro ao tentar deletar um ID inexistente', async () => {
    (Usuario.findByPk as jest.Mock).mockResolvedValue(null);

    await expect(usuariosService.deleteUsuario(99)).rejects.toThrow('Usuário não encontrado');
  });
});
