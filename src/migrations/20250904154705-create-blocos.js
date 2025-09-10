'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blocos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeBloco: {
        allowNull: false,
        type: Sequelize.STRING
      },
      posicao: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      codProjeto: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'projetos', key: 'id' }
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
    await queryInterface.dropTable('blocos');
  }
};