'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    static associate(models) {
      Classes.hasMany(models.Classe_Checkbox, {
        foreignKey: 'codClasse'
      });

      Classes.hasMany(models.Classe_Texto, {
        foreignKey: 'codClasse'
      });

      Classes.hasMany(models.Classe_Imagem, {
        foreignKey: 'codClasse'
      });

      Classes.hasMany(models.Classe_Link, {
        foreignKey: 'codClasse'
      });
    }
  }
  Classes.init({
    nomeClasse: DataTypes.STRING,
    ordemClasse: DataTypes.INTEGER,
    codBloco: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Classes',
    tableName: 'classes'
  });
  return Classes;
};