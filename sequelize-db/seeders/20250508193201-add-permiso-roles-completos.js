'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('roles_permisos', [
    // Rol ADMIN (id: 1)
    ...[19, 21, 23, 25, 27, 29, 31, 33, 34].map(permiso_id => ({
      rol_id: 1,
      permiso_id,
      created_at: new Date(),
      updated_at: new Date()
    })),

    // Rol USUARIO REGULAR (id: 2)
    ...[29, 31, 33, 34, 28, 30].map(permiso_id => ({
      rol_id: 2,
      permiso_id,
      created_at: new Date(),
      updated_at: new Date()
    })),

    // Rol USUARIO PREMIUM (id: 5)
    ...[19, 29, 31, 33, 34, 28, 30].map(permiso_id => ({
      rol_id: 5,
      permiso_id,
      created_at: new Date(),
      updated_at: new Date()
    })),
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('roles_permisos', null, {});
}
