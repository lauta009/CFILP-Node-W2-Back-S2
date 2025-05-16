'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles_permisos', [
      // ADMIN (id: 1)
      ...[1,2, 3,4, 5,6, 7, 8, 9,10, 11, 12,13,14, 15].map(permiso_id => ({
        rol_id: 1,
        permiso_id,
        created_at: new Date(),
        updated_at: new Date()
      })),

      // USUARIO REGULAR (id: 2)
      ...[2, 4, 6, 8,10].map(permiso_id => ({
        rol_id: 2,
        permiso_id,
        created_at: new Date(),
        updated_at: new Date()
      })),

      // USUARIO PREMIUM (id: 5)
      ...[2, 4, 6,8, 10, 11].map(permiso_id => ({
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