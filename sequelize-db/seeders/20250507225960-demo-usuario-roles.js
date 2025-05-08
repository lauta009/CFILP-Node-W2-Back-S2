'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('usuario_roles', [
    // Asignando rol admin a un usuario (ejemplo: id=1)
    {
      usuario_id: 1, // Asume que este es el ID del usuario admin
      rol_id: 1, // rol_id=1 para admin
      created_at: new Date(),
      updated_at: new Date()
    },
    // Asignando rol usuario regular a otros usuarios
    {
      usuario_id: 2, // Asume que este es un usuario regular
      rol_id: 2, // rol_id=2 para usuario
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 3, // Otro usuario regular
      rol_id: 2, // rol_id=2 para usuario
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 4, // Otro usuario regular
      rol_id: 2, // rol_id=2 para usuario
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('usuario_roles', null, {});
}

