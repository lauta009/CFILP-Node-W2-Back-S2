'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('autores', [
    { id: 1, nombre: 'Jorge Luis', apellido: 'Borges', created_at: new Date(), updated_at: new Date() },
    { id: 2, nombre: 'Julio', apellido: 'Cortázar', created_at: new Date(), updated_at: new Date() },
    { id: 3, nombre: 'Gabriel', apellido: 'García Márquez', created_at: new Date(), updated_at: new Date() },
    { id: 4, nombre: 'Isabel', apellido: 'Allende', created_at: new Date(), updated_at: new Date() },
    { id: 5, nombre: 'Mario', apellido: 'Vargas Llosa', created_at: new Date(), updated_at: new Date() },
    { id: 6, nombre: 'Stephen', apellido: 'King', created_at: new Date(), updated_at: new Date() },
    { id: 7, nombre: 'Jane', apellido: 'Austen', created_at: new Date(), updated_at: new Date() },
    { id: 8, nombre: 'George R. R.', apellido: 'Martin', created_at: new Date(), updated_at: new Date() },
    { id: 9, nombre: 'Haruki', apellido: 'Murakami', created_at: new Date(), updated_at: new Date() },
    { id: 10, nombre: 'Agatha', apellido: 'Christie', created_at: new Date(), updated_at: new Date() },
    { id: 11, nombre: 'Carlos', apellido: 'Ruiz Zafón', created_at: new Date(), updated_at: new Date() },
    { id: 12, nombre: 'Virginia', apellido: 'Woolf', created_at: new Date(), updated_at: new Date() },
    { id: 13, nombre: 'Juan', apellido: 'Pérez', created_at: new Date(), updated_at: new Date() },
    { id: 14, nombre: 'Ana', apellido: 'González', created_at: new Date(), updated_at: new Date() },
    { id: 15, nombre: 'Lucía', apellido: 'Martínez', created_at: new Date(), updated_at: new Date() },
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('autores', null, {});
}
