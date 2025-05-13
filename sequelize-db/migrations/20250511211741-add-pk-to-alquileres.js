'use strict';

module.exports = {
  up: async (queryInterface) => {
    //await queryInterface.removeIndex('alquileres', ['usuario_id', 'ejemplar_id']);

    await queryInterface.addConstraint('alquileres', {
      fields: ['usuario_id', 'ejemplar_id'],
      type: 'primary key',
      name: 'pk_alquileres_usuario_ejemplar'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeConstraint('alquileres', 'pk_alquileres_usuario_ejemplar');
    await queryInterface.addIndex('alquileres', ['usuario_id', 'ejemplar_id']);
  }
};
