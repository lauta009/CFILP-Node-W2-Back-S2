'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('autores_libros', {
      libro_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'libros',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      autor_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'autores',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('autores_libros');
  }
};
