// seeders/202305070011-demo-roles_permisos.js
'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('roles_permisos', [
    // Admin: Todos los permisos
    {
      rol_id: 1, // rol admin
      permiso_id: 1, // crear_libro
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 2, // leer_libro
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 3, // actualizar_libro
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 4, // eliminar_libro
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 5, // crear_usuario
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 6, // leer_usuario
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 7, // actualizar_usuario
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 8, // eliminar_usuario
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 9, // crear_categoria
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 10, // leer_categoria
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 11, // actualizar_categoria
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 12, // eliminar_categoria
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 1, // rol admin
      permiso_id: 13, // gestionar_roles
      created_at: new Date(),
      updated_at: new Date()
    },

    // Usuario regular: permisos limitados
    {
      rol_id: 2, // rol usuario
      permiso_id: 14, // consultar_libro
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 2, // rol usuario
      permiso_id: 15, // consultar_disponibilidad
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 2, // rol usuario
      permiso_id: 16, // alquilar_libro
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol_id: 2, // rol usuario
      permiso_id: 17, // consultar_ejemplar
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('roles_permisos', null, {});
}
