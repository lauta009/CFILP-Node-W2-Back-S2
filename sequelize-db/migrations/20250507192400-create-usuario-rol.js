'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuario_roles', {
      usuario_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
      },
      rol_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'roles', key: 'id' }
      },
      created_at: Sequelize.DataTypes.DATE,
      updated_at: Sequelize.DataTypes.DATE
    });

    await queryInterface.addIndex('usuario_roles', ['usuario_id'], {
      name: 'usuario_roles_usuario_id_idx'
    });
    await queryInterface.addIndex('usuario_roles', ['rol_id'], {
      name: 'usuario_roles_rol_id_idx'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeIndex('usuario_roles', 'usuario_roles_usuario_id_idx');
    await queryInterface.removeIndex('usuario_roles', 'usuario_roles_rol_id_idx');
    await queryInterface.dropTable('usuario_roles');
  }
};
