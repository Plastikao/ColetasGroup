'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projeto extends Model {
    static associate(models) {
      Projeto.hasMany(models.Participantes, {
        foreignKey: 'codProjeto'
      });
      Projeto.hasMany(models.Blocos, {
        foreignKey: 'codProjeto'
      });
    }
  }
  Projeto.init({
    tituloProjeto: DataTypes.STRING,
    status: DataTypes.STRING,
    codProprietario: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Projeto',
    tableName: 'projetos'
  });
  return Projeto;
};