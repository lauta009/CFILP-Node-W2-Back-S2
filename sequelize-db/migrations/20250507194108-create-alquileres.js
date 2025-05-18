'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alquileres', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      ejemplar_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'ejemplares',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      fecha_alquiler: Sequelize.DATE,
      fecha_vencimiento: Sequelize.DATE,
      fecha_devolucion: Sequelize.DATE,
      estado: {
        type: Sequelize.ENUM('pendiente', 'devuelto', 'atrasado'),
        allowNull: false,
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    });

    await queryInterface.addIndex('alquileres', ['fecha_vencimiento', 'estado']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('alquileres');
  }
};
