'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('roles_permisos', {
    rol_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'roles', 
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    permiso_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'permisos', 
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('roles_permisos');
}
