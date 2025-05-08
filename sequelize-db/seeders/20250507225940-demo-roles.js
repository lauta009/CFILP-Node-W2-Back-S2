// seeders/202305070008-demo-roles.js
'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('roles', [
    {
      nombre: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'usuario',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('roles', null, {});
}
