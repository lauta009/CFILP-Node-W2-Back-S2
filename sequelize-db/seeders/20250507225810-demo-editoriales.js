'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('editoriales', [
    { id: 1, nombre: 'Penguin Random House', created_at: new Date(), updated_at: new Date() },
    { id: 2, nombre: 'Planeta', created_at: new Date(), updated_at: new Date() },
    { id: 3, nombre: 'Alfaguara', created_at: new Date(), updated_at: new Date() },
    { id: 4, nombre: 'Siglo XXI Editores', created_at: new Date(), updated_at: new Date() },
    { id: 5, nombre: 'Editorial Sudamericana', created_at: new Date(), updated_at: new Date() },
    { id: 6, nombre: 'Anagrama', created_at: new Date(), updated_at: new Date() },
    { id: 7, nombre: 'Tusquets Editores', created_at: new Date(), updated_at: new Date() },
    { id: 8, nombre: 'Paidos', created_at: new Date(), updated_at: new Date() },
    { id: 9, nombre: 'Eudeba', created_at: new Date(), updated_at: new Date() },
    { id: 10, nombre: 'Colihue', created_at: new Date(), updated_at: new Date() },
    { id: 11, nombre: 'Kapelusz', created_at: new Date(), updated_at: new Date() },
    { id: 12, nombre: 'Cántaro', created_at: new Date(), updated_at: new Date() },
    { id: 13, nombre: 'Ediciones Godot', created_at: new Date(), updated_at: new Date() },
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('editoriales', null, {});
}
