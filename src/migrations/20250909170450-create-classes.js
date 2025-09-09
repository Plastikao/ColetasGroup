'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeClasse: {
        type: Sequelize.STRING
      },
      ordemClasse: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      tipoClasse: {
        allowNull: false,
        type: Sequelize.STRING
      },
      codBloco: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'blocos', key: 'id' }
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
    await queryInterface.dropTable('classes');
  }
};