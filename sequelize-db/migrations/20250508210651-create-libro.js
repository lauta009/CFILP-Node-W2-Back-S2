'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Libros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      editorial_id: {
        type: Sequelize.INTEGER
      },
      fecha_publicacion: {
        type: Sequelize.DATE
      },
      isbn: {
        type: Sequelize.STRING
      },
      resumen: {
        type: Sequelize.TEXT
      },
      portada_url: {
        type: Sequelize.STRING
      },
      idioma: {
        type: Sequelize.STRING
      },
      nro_paginas: {
        type: Sequelize.INTEGER
      },
      es_premium: {
        type: Sequelize.BOOLEAN
      },
      categoria_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Libros');
  }
};