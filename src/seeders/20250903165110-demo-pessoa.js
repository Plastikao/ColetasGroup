'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'John Jonas Cowboy',
      email: 'johnjonas@gmail.com',
      senha: 'john123',
      criacaoConta: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
