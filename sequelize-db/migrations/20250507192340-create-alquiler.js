'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('alquileres', {
      usuario_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'usuarios',
          key: 'id'
        }
      },
      ejemplar_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: 'ejemplares',
          key: 'id'
        }
      },
      fecha_alquiler: Sequelize.DataTypes.DATE,
      fecha_vencimiento: Sequelize.DataTypes.DATE,
      fecha_devolucion: Sequelize.DataTypes.DATE,
      estado: {
        type: Sequelize.DataTypes.ENUM('pendiente', 'devuelto', 'atrasado')
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    });

    await queryInterface.addIndex('alquileres', ['usuario_id', 'ejemplar_id']);
    await queryInterface.addIndex('alquileres', ['estado']);
    await queryInterface.addIndex('alquileres', ['fecha_vencimiento']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('alquileres');
  }
};
