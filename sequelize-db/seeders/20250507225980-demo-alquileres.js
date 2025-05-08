'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('alquileres', [
 
    {
      usuario_id: 2,
      ejemplar_id: 19,
      fecha_alquiler: new Date(),
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + 30)),
      fecha_devolucion: null,
      estado: 'pendiente',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 2,
      ejemplar_id: 20,
      fecha_alquiler: new Date(),
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + 30)),
      fecha_devolucion: null,
      estado: 'pendiente',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 2,
      ejemplar_id: 21,
      fecha_alquiler: new Date(new Date().setDate(new Date().getDate() - 40)),
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() - 10)),
      fecha_devolucion: null,
      estado: 'pendiente', // Atrasado
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 2,
      ejemplar_id: 22,
      fecha_alquiler: new Date(new Date().setDate(new Date().getDate() - 50)),
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() - 20)),
      fecha_devolucion: new Date(new Date().setDate(new Date().getDate() - 15)),
      estado: 'devuelto',
      created_at: new Date(),
      updated_at: new Date()
    },

    // Alquileres de usuario 3 
    {
      usuario_id: 3, 
      ejemplar_id: 28,
      fecha_alquiler: new Date(new Date().setDate(new Date().getDate() - 100)), 
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() - 70)),
      fecha_devolucion: new Date(),
      estado: 'devuelto',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 3, 
      ejemplar_id: 29, 
      fecha_alquiler: new Date(),
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + 30)),
      fecha_devolucion: null,
      estado: 'pendiente',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 3, 
      ejemplar_id: 30, 
      fecha_alquiler: new Date(new Date().setDate(new Date().getDate() - 120)), 
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() - 90)),
      fecha_devolucion: null,
      estado: 'pendiente', // Atrasado
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 3,
      ejemplar_id: 31,
      fecha_alquiler: new Date(new Date().setDate(new Date().getDate() - 80)), 
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() - 50)),
      fecha_devolucion: new Date(),
      estado: 'devuelto',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 3,
      ejemplar_id: 32, 
      fecha_alquiler: new Date(),
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() + 30)),
      fecha_devolucion: null,
      estado: 'pendiente',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 3,
      ejemplar_id: 33,
      fecha_alquiler: new Date(new Date().setDate(new Date().getDate() - 60)), 
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() - 30)),
      fecha_devolucion: new Date(),
      estado: 'devuelto',
      created_at: new Date(),
      updated_at: new Date()
    },

    // Alquileres de usuario 4
    {
      usuario_id: 4, 
      ejemplar_id: 23, 
      fecha_alquiler: new Date(),
      fecha_vencimiento: new Date(new Date().setMonth(new Date().getMonth() + 6)),
      fecha_devolucion: null,
      estado: 'pendiente', 
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 4,
      ejemplar_id: 24, 
      fecha_alquiler: new Date(),
      fecha_vencimiento: new Date(new Date().setMonth(new Date().getMonth() + 6)),
      fecha_devolucion: null,
      estado: 'pendiente', 
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 4,
      ejemplar_id: 25,
      fecha_alquiler: new Date(new Date().setDate(new Date().getDate() - 200)), 
      fecha_vencimiento: new Date(new Date().setDate(new Date().getDate() - 20)),
      fecha_devolucion: new Date(new Date().setDate(new Date().getDate() - 10)),
      estado: 'devuelto',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 4,
      ejemplar_id: 26, 
      fecha_alquiler: new Date(),
      fecha_vencimiento: new Date(new Date().setMonth(new Date().getMonth() + 6)),
      fecha_devolucion: null,
      estado: 'pendiente', 
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      usuario_id: 4,
      ejemplar_id: 27, 
      fecha_alquiler: new Date(new Date().setDate(new Date().getDate() - 180)), 
      fecha_vencimiento: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      fecha_devolucion: null,
      estado: 'pendiente', // Atrasado
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('alquileres', null, {});
}
