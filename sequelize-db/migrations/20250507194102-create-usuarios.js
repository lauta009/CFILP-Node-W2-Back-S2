'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: Sequelize.STRING(100),
      apellido: Sequelize.STRING(100),
      email: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      password: Sequelize.STRING(255),
      telefono: Sequelize.STRING(20),
      direccion: Sequelize.STRING(150),
      localidad: Sequelize.STRING(100),
      ultimo_login: Sequelize.DATE,
      estado: Sequelize.BOOLEAN,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
