'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classe_Imagem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Classe_Imagem.init({
    nomeImagem: DataTypes.STRING,
    ordemImagem: DataTypes.INTEGER,
    imagem: DataTypes.STRING,
    codClasse: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classe_Imagem',
    tableName: 'classe_imagem'
  });
  return Classe_Imagem;
};