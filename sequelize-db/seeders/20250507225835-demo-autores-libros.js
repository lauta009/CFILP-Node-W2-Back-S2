// seeders/202305070005-demo-autores-libros.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('autores_libros', [
      { libro_id: 1, autor_id: 1, created_at: new Date(), updated_at: new Date() }, // El infinito en un junco - Jorge Luis Borges
      { libro_id: 2, autor_id: 2, created_at: new Date(), updated_at: new Date() }, // Moscú 2042 - Julio Cortázar
      { libro_id: 3, autor_id: 3, created_at: new Date(), updated_at: new Date() }, // En los zapatos de Valeria - Gabriel García Márquez
      { libro_id: 4, autor_id: 4, created_at: new Date(), updated_at: new Date() }, // Cien años de soledad - Isabel Allende
      { libro_id: 5, autor_id: 5, created_at: new Date(), updated_at: new Date() }, // La sombra del viento - Mario Vargas Llosa
      { libro_id: 5, autor_id: 6, created_at: new Date(), updated_at: new Date() }, // La sombra del viento - Carlos Ruiz Zafón
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('autores_libros', null, {});
  }
};
