'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conteudo_Classe extends Model {
    static associate(models) {
      Conteudo_Classe.belongsTo(models.Classes, {
        foreignKey: 'codClasse'
      });
    }
  }
  Conteudo_Classe.init({
    nomeConteudo: DataTypes.STRING,
    ordemConteudo: DataTypes.INTEGER,
    conteudo: DataTypes.STRING,
    codClasse: DataTypes.INTEGER,
    descricaoConteudo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Conteudo_Classe',
    tableName: 'conteudoClasse'
  });
  return Conteudo_Classe;
};