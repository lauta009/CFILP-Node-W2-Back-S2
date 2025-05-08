'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('permisos', [
    // Libros
    { nombre: 'gestionar_libros', created_at: new Date(), updated_at: new Date() },     // admin
    { nombre: 'consultar_libros', created_at: new Date(), updated_at: new Date() },     // usuario/premium

    // Categorías
    { nombre: 'gestionar_categorias', created_at: new Date(), updated_at: new Date() }, // admin
    { nombre: 'consultar_categorias', created_at: new Date(), updated_at: new Date() }, // usuario/premium

    // Autores
    { nombre: 'gestionar_autores', created_at: new Date(), updated_at: new Date() },    // admin
    { nombre: 'consultar_autores', created_at: new Date(), updated_at: new Date() },    // usuario/premium

    // Ejemplares
    { nombre: 'agregar_ejemplar', created_at: new Date(), updated_at: new Date() },     // admin
    { nombre: 'modificar_ejemplar', created_at: new Date(), updated_at: new Date() },   // admin
    { nombre: 'eliminar_ejemplar', created_at: new Date(), updated_at: new Date() },    // admin
    { nombre: 'consultar_ejemplar', created_at: new Date(), updated_at: new Date() },   // usuario/premium

    // Usuarios
    { nombre: 'gestionar_usuarios', created_at: new Date(), updated_at: new Date() },       // admin
    { nombre: 'gestionar_datos_propios', created_at: new Date(), updated_at: new Date() },  // usuario/premium

    // Alquileres
    { nombre: 'alquilar_libro', created_at: new Date(), updated_at: new Date() },           // usuario/premium
    { nombre: 'alquilar_libro_premium', created_at: new Date(), updated_at: new Date() },   // premium

    // Roles y disponibilidad
    { nombre: 'gestionar_roles', created_at: new Date(), updated_at: new Date() },          // admin
    { nombre: 'consultar_disponibilidad', created_at: new Date(), updated_at: new Date() }  // usuario/premium
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('permisos', null, {});
}

