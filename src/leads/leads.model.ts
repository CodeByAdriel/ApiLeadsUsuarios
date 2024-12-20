import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

export interface LeadAttributes {
  id: number;
  nome: string;
  email: string;
  whatsapp: number;
}

interface LeadCreationAttributes extends Optional<LeadAttributes, 'id'> {}

export class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  public id!: number;
  public nome!: string;
  public email!: string;
  public whatsapp!: number;
}

export const initLeadModel = (sequelize: Sequelize) => {
  Lead.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      whatsapp: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'leads',
      freezeTableName: true, // Impede pluralização automática
      timestamps: false,
    }
  );

  return Lead;
};
