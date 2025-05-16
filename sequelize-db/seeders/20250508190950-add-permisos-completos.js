'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('permisos', [
      { id:1, nombre: 'gestionar_libros', created_at: new Date(), updated_at: new Date() },     // admin 1
      { id:2,nombre: 'consultar_libros', created_at: new Date(), updated_at: new Date() },     // usuario/premium 2

      { id:3, nombre: 'gestionar_categorias', created_at: new Date(), updated_at: new Date() }, // admin 3
      { id:4, nombre: 'consultar_categorias', created_at: new Date(), updated_at: new Date() }, // usuario/premium 4 

      { id:5, nombre: 'gestionar_autores', created_at: new Date(), updated_at: new Date() },    // admin 5 
      { id:6, nombre: 'consultar_autores', created_at: new Date(), updated_at: new Date() },    // usuario/premium 6 

      { id:7, nombre: 'gestionar_ejemplar', created_at: new Date(), updated_at: new Date() },     // admin 7 
      { id:8, nombre: 'consultar_ejemplar', created_at: new Date(), updated_at: new Date() },   // admin 8 

  
      { id:9, nombre: 'gestionar_mi_perfil', created_at: new Date(), updated_at: new Date() },  // usuario/premium/admin 9

      { id:10, nombre: 'alquilar_libro', created_at: new Date(), updated_at: new Date() },           // usuario/premium 10
      { id:11, nombre: 'alquilar_libro_premium', created_at: new Date(), updated_at: new Date() },   // premium 11

      { id:12, nombre: 'gestionar_roles', created_at: new Date(), updated_at: new Date() },  // admin 12
      { id:13, nombre: 'consultar_roles', created_at: new Date(), updated_at: new Date() },          // admin 13

      { id:14, nombre: 'gestionar_usuarios', created_at: new Date(), updated_at: new Date() },          // admin 14
      { id:15, nombre: 'eliminar_usuario', created_at: new Date(), updated_at: new Date() }  // usuario/premium 15
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('permisos', null, {});
  }
};

