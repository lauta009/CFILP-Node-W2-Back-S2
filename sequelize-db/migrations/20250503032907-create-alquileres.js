'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('alquileres', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    usuario_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    libro_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'libros',
        key: 'id'
      }
    },
    fecha_alquiler: {
      type: Sequelize.DATE,
      allowNull: false
    },
    fecha_devolucion: {
      type: Sequelize.DATE,
      allowNull: false
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('alquileres');
}