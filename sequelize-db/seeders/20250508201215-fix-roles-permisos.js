'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles_permisos', [
      ...[21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34].map(permiso_id => ({
        rol_id: 1,
        permiso_id,
        created_at: new Date(),
        updated_at: new Date()
      })),

      ...[19, 28, 29, 30, 31, 33, 34].map(permiso_id => ({
        rol_id: 2,
        permiso_id,
        created_at: new Date(),
        updated_at: new Date()
      })),

      ...[19, 20, 28, 29, 30, 31, 33, 34].map(permiso_id => ({
        rol_id: 5,
        permiso_id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles_permisos', null, {});
  }
};
