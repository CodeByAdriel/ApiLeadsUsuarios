'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lead extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lead.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    whatsapp: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Lead',
  });
  return Lead;
};