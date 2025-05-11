'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('roles_permisos', {
      fields: ['rol_id', 'permiso_id'],
      type: 'primary key',
      name: 'pk_roles_permisos'
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('roles_permisos', 'pk_permisos_roles');
  }
};
