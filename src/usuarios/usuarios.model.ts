import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

// Define os atributos do usuário
export interface UsuarioAttributes {
  id: number;
  email: string;
  senha: string; // Campo para armazenar o hash da senha
}

// Define os atributos necessários para criação (id é opcional)
interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id'> {}

// Define a classe do modelo de usuário
export class Usuario
  extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes
{
  public id!: number;
  public email!: string;
  public senha!: string; // O hash da senha será armazenado aqui
}

// Inicializa o modelo Usuario
export const initUsuarioModel = (sequelize: Sequelize) => {
  Usuario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Valida se é um e-mail válido
        },
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false, // O campo senha deve ser obrigatório
      },
    },
    {
      sequelize, // Instância do Sequelize
      tableName: 'usuarios', // Nome da tabela no banco de dados
      freezeTableName: true, // Impede pluralização automática
      timestamps: false, // Não utilizar createdAt e updatedAt
    }
  );

  return Usuario;
};
