'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conteudo_Classe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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