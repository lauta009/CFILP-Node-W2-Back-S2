'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('libros', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      titulo: { type: Sequelize.STRING(255), allowNull: false },
      editorial_id: {
        type: Sequelize.INTEGER,
        references: { model: 'editoriales', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fecha_publicacion: Sequelize.DATE,
      isbn: Sequelize.STRING(17),
      resumen: Sequelize.TEXT,
      portada_url: Sequelize.STRING(255),
      idioma: Sequelize.STRING(100),
      nro_paginas: Sequelize.INTEGER,
      es_premium: Sequelize.BOOLEAN,
      categoria_id: {
        type: Sequelize.INTEGER,
        references: { model: 'categorias', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('libros');
  }
};
