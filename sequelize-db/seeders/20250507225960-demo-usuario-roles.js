'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuario_roles', [
      {
        usuario_id: 1,
        rol_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 2,
        rol_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 3,
        rol_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 4,
        rol_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuario_roles', null, {});
  }
};

