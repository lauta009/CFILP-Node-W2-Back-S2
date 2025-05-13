'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles_permisos', [
      // ADMIN (id: 1)
      ...[1, 3, 5, 7, 8, 9, 11, 15].map(permiso_id => ({
        rol_id: 1,
        permiso_id,
        created_at: new Date(),
        updated_at: new Date()
      })),

      // USUARIO REGULAR (id: 2)
      ...[2, 4, 6, 10, 12, 13, 16].map(permiso_id => ({
        rol_id: 2,
        permiso_id,
        created_at: new Date(),
        updated_at: new Date()
      })),

      // USUARIO PREMIUM (id: 5)
      ...[2, 4, 6, 10, 12, 13, 14, 16].map(permiso_id => ({
        rol_id: 3,
        permiso_id,
        created_at: new Date(),
        updated_at: new Date()
      })),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles_permisos', null, {});
  }
};