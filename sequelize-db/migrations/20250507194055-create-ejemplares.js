'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ejemplares', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      libro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'libros',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      codigo_barra: {
        type: Sequelize.STRING(100),
        unique: true,
      },
      estado: {
        type: Sequelize.ENUM('disponible', 'prestado', 'reparacion', 'baja'),
        allowNull: false,
        defaultValue: 'disponible',
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.addIndex('ejemplares', ['libro_id', 'estado']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ejemplares');
  }
};

