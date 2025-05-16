'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('alquileres', [
      {
        usuario_id: 2,
        ejemplar_id: 2,
        fecha_alquiler: new Date(),
        fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + 30)),
        fecha_devolucion: null,
        estado: 'pendiente',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 2,
        ejemplar_id: 3,
        fecha_alquiler: new Date(),
        fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + 30)),
        fecha_devolucion: null,
        estado: 'pendiente',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 2,
        ejemplar_id: 4,
        fecha_alquiler: new Date(new Date().setDate(new Date().getDate() - 40)),
        fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() - 10)),
        fecha_devolucion: null,
        estado: 'pendiente', // Atrasado
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        usuario_id: 2,
        ejemplar_id: 5,
        fecha_alquiler: new Date(new Date().setDate(new Date().getDate() - 50)),
        fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() - 20)),
        fecha_devolucion: new Date(new Date().setDate(new Date().getDate() - 15)),
        estado: 'devuelto',
        created_at: new Date(),
        updated_at: new Date()
      },

    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('alquileres', null, {});
  }
};
