'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classe_imagem', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeImagem: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ordemImagem: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      imagem: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codClasse: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'classes', key: 'id' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('classe_imagem');
  }
};