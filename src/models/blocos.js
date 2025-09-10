'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blocos extends Model {
    static associate(models) {
      Blocos.hasMany(models.Classes, {
        foreignKey: 'codBloco'
      });
    }
  }
  Blocos.init({
    nomeBloco: DataTypes.STRING,
    posicao: DataTypes.INTEGER,
    codProjeto: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Blocos',
    tableName: 'blocos'
  });
  return Blocos;
};