'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('libros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      editorial_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'editoriales',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fecha_publicacion: {
        type: Sequelize.DATE
      },
      isbn: {
        type: Sequelize.STRING(17),
        unique: true
      },
      resumen: {
        type: Sequelize.TEXT
      },
      portada_url: {
        type: Sequelize.STRING(255)
      },
      idioma: {
        type: Sequelize.STRING(50)
      },
      nro_paginas: {
        type: Sequelize.INTEGER
      },
      es_premium: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categorias',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('libros', ['titulo', 'isbn', 'es_premium']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('libros');
  }
};
