'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('permisos', [
    // Permisos para admin
    {
      nombre: 'crear_usuario',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'editar_usuario',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'eliminar_usuario',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'ver_usuario',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'crear_libro',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'editar_libro',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'eliminar_libro',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'ver_libro',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'gestionar_alquiler',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'ver_alquiler',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'crear_rol',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'editar_rol',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'eliminar_rol',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'ver_rol',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'asignar_permiso',
      created_at: new Date(),
      updated_at: new Date()
    },
    // Permisos para usuario regular
    {
      nombre: 'consultar_disponibilidad',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'alquilar_libro',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombre: 'ver_libro',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('permisos', null, {});
}
