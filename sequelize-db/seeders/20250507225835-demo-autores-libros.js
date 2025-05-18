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
      { libro_id: 6, autor_id: 2, created_at: new Date(), updated_at: new Date() }, // Rayuela - Julio Cortázar
      { libro_id: 7, autor_id: 16, created_at: new Date(), updated_at: new Date() }, // 1984 - George Orwell
      { libro_id: 8, autor_id: 7, created_at: new Date(), updated_at: new Date() }, // Orgullo y prejuicio - Jane Austen
      { libro_id: 9, autor_id: 6, created_at: new Date(), updated_at: new Date() }, // El resplandor - Stephen King
      { libro_id: 10, autor_id: 17, created_at: new Date(), updated_at: new Date() }, // Los detectives salvajes - Roberto Bolaño
      { libro_id: 11, autor_id: 18, created_at: new Date(), updated_at: new Date() }, // Fahrenheit 451 - Ray Bradbury
      { libro_id: 12, autor_id: 19, created_at: new Date(), updated_at: new Date() }, // Don Quijote de la Mancha - Miguel de Cervantes
      { libro_id: 13, autor_id: 1, created_at: new Date(), updated_at: new Date() }, // El Aleph - Jorge Luis Borges
      { libro_id: 14, autor_id: 20, created_at: new Date(), updated_at: new Date() }, // Ensayo sobre la ceguera - José Saramago
      { libro_id: 15, autor_id: 5, created_at: new Date(), updated_at: new Date() }, // La tregua - Mario Benedetti
      { libro_id: 16, autor_id: 21, created_at: new Date(), updated_at: new Date() }, // El nombre de la rosa - Umberto Eco
      { libro_id: 17, autor_id: 3, created_at: new Date(), updated_at: new Date() }, // Crónica de una muerte anunciada - Gabriel García Márquez
      { libro_id: 18, autor_id: 22, created_at: new Date(), updated_at: new Date() }, // El Hobbit - J.R.R. Tolkien
      { libro_id: 20, autor_id: 24, created_at: new Date(), updated_at: new Date() }, // El psicoanalista - John Katzenbach
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('autores_libros', null, {});
  }
};
