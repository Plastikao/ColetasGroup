'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participantes extends Model {
    static associate(models) {
      Participantes.belongsTo(models.Projeto, {
        foreignKey: 'codProjeto'
      });
    }
  }
  Participantes.init({
    codUsuario: DataTypes.INTEGER,
    codProjeto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Participantes',
    tableName: 'participantes'
  });
  return Participantes;
};