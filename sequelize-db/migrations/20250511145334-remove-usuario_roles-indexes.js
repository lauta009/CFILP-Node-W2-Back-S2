'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    //await queryInterface.removeIndex('usuario_roles', 'usuario_roles_usuario_id_idx');
    //await queryInterface.removeIndex('usuario_roles', 'usuario_roles_rol_id_idx');
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.addIndex('usuario_roles', ['usuario_id'], {
      name: 'usuario_roles_usuario_id_idx'
    });
    await queryInterface.addIndex('usuario_roles', ['rol_id'], {
      name: 'usuario_roles_rol_id_idx'
    });
  }
};





