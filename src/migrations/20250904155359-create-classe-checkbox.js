'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('classe_checkbox', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomeCheckbox: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ordemCheckbox: {
        allowNull: false,
        type: Sequelize.STRING
      },
      checked: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('classe_checkbox');
  }
};