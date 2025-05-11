'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('usuario_roles', {
      fields: ['usuario_id', 'rol_id'],
      type: 'primary key',
      name: 'pk_usuario_roles'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('usuario_roles', 'pk_usuario_roles');
  }
};
