'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    static associate(models) {
      Classes.hasMany(models.Conteudo_Classe, {
        foreignKey: 'codClasse'
      });
      
      Classes.belongsTo(models.Blocos, {
        foreignKey: 'codBloco'
      });
    }
  }
  Classes.init({
    nomeClasse: DataTypes.STRING,
    ordemClasse: DataTypes.INTEGER,
    tipoClasse: DataTypes.STRING,
    codBloco: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classes',
    tableName: 'classes'
  });
  return Classes;
};