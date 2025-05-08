'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('autores', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      apellido: { type: Sequelize.STRING(50), allowNull: false },
      nombre: { type: Sequelize.STRING(50), allowNull: false },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('autores');
  }
};
