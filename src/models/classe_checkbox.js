'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classe_Checkbox extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Classe_Checkbox.init({
    nomeCheckbox: DataTypes.STRING,
    ordemCheckbox: DataTypes.STRING,
    checked: DataTypes.BOOLEAN,
    codClasse: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classe_Checkbox',
    tableName: 'classe_checkbox'
  });
  return Classe_Checkbox;
};