'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ejemplares', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      libro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'libros',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      codigo_barra: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      estado: {
        type: Sequelize.ENUM('disponible', 'prestado', 'reparacion', 'baja'),
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    await queryInterface.addIndex('ejemplares', ['libro_id', 'estado']);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('ejemplares');
  }
};
