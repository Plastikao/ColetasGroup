'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classe_Texto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Classe_Texto.init({
    nomeTexto: DataTypes.STRING,
    ordemTexto: DataTypes.INTEGER,
    texto: DataTypes.STRING,
    codClasse: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classe_Texto',
    tableName: 'classe_texto'
  });
  return Classe_Texto;
};