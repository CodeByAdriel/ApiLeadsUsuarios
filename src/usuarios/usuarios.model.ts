import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

export interface UsuarioAttributes {
  id: number;
  email: string;
  senha: string;
}

interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id'> {}

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  public id!: number;
  public email!: string;
  public senha!: string;
}

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
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'usuarios',
      timestamps: false,
    }
  );

  return Usuario;
};
