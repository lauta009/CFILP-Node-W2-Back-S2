'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categorias', [
      { id: 1, nombre: 'Ficción', categoria_padre_id: null, created_at: new Date(), updated_at: new Date() },
      { id: 2, nombre: 'Ciencia Ficción', categoria_padre_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 3, nombre: 'Fantasía', categoria_padre_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 4, nombre: 'Policial', categoria_padre_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 5, nombre: 'Romance', categoria_padre_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 6, nombre: 'Terror', categoria_padre_id: 1, created_at: new Date(), updated_at: new Date() },
      { id: 7, nombre: 'No Ficción', categoria_padre_id: null, created_at: new Date(), updated_at: new Date() },
      { id: 8, nombre: 'Historia', categoria_padre_id: 7, created_at: new Date(), updated_at: new Date() },
      { id: 9, nombre: 'Biografía', categoria_padre_id: 7, created_at: new Date(), updated_at: new Date() },
      { id: 10, nombre: 'Ciencia', categoria_padre_id: 7, created_at: new Date(), updated_at: new Date() },
      { id: 11, nombre: 'Divulgación Científica', categoria_padre_id: 10, created_at: new Date(), updated_at: new Date() },
      { id: 12, nombre: 'Tecnología', categoria_padre_id: 7, created_at: new Date(), updated_at: new Date() },
      { id: 13, nombre: 'Psicología', categoria_padre_id: 7, created_at: new Date(), updated_at: new Date() },
      { id: 14, nombre: 'Educación', categoria_padre_id: 7, created_at: new Date(), updated_at: new Date() },
      { id: 15, nombre: 'Ensayo', categoria_padre_id: 7, created_at: new Date(), updated_at: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categorias', null, {});
  }
};
