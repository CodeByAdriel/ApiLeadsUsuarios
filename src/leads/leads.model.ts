import { DataTypes, Sequelize, ModelStatic } from 'sequelize';

// Modelo Lead
let Lead: ModelStatic<any>;

export const defineLeadModel = (sequelize: Sequelize): ModelStatic<any> => {
  Lead = sequelize.define('Lead', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  }, {
    tableName: 'leads',
    timestamps: false, // Remove createdAt e updatedAt
  });

  return Lead;
};

// Exporta o modelo Lead para uso em outros módulos
export { Lead };
