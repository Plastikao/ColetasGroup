'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classe_link', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeLink: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ordemLink: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      link: {
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
    await queryInterface.dropTable('classe_link');
  }
};