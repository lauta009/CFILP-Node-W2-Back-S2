'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles_permisos', {
      rol_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' }
      },
      permiso_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'permisos', key: 'id' }
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    });

    await queryInterface.addIndex('roles_permisos', ['rol_id'], {
      name: 'roles_permisos_rol_id_idx'
    });
    await queryInterface.addIndex('roles_permisos', ['permiso_id'], {
      name: 'roles_permisos_permiso_id_idx'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex('roles_permisos', 'roles_permisos_rol_id_idx');
    await queryInterface.removeIndex('roles_permisos', 'roles_permisos_permiso_id_idx');
    await queryInterface.dropTable('roles_permisos');
  }
};
