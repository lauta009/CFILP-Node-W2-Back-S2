'use strict';

'use strict';

module.exports = {
  up: async (queryInterface) => {
    //await queryInterface.removeIndex('roles_permisos', 'roles_permisos_rol_id_idx');
    //await queryInterface.removeIndex('roles_permisos', 'roles_permisos_permiso_id_idx');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('roles_permisos', ['rol_id'], {
      name: 'roles_permisos_rol_id_idx'
    });
    await queryInterface.addIndex('roles_permisos', ['permiso_id'], {
      name: 'roles_permisos_permiso_id_idx'
    });
  }
};

