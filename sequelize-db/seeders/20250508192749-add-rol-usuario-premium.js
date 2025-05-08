'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('roles', [
    {
      nombre: 'usuario_premium',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('roles', { nombre: 'usuario_premium' });
}
