'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classe_Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Classe_Link.init({
    nomeLink: DataTypes.STRING,
    ordemLink: DataTypes.INTEGER,
    link: DataTypes.STRING,
    codClasse: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classe_Link',
    tableName: 'classe_link'
  });
  return Classe_Link;
};