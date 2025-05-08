
'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('ejemplares', [
    // Ejemplares para "El infinito en un junco"
    {
      libro_id: 1, // El infinito en un junco
      codigo_barra: '9788417860790-001',
      estado: 'disponible',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      libro_id: 1, // El infinito en un junco
      codigo_barra: '9788417860790-002',
      estado: 'prestado',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      libro_id: 1, // El infinito en un junco
      codigo_barra: '9788417860790-003',
      estado: 'reparacion',
      created_at: new Date(),
      updated_at: new Date()
    },

    // Ejemplares para "Moscú 2042"
    {
      libro_id: 2, // Moscú 2042
      codigo_barra: '9788432215472-001',
      estado: 'disponible',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      libro_id: 2, // Moscú 2042
      codigo_barra: '9788432215472-002',
      estado: 'prestado',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      libro_id: 2, // Moscú 2042
      codigo_barra: '9788432215472-003',
      estado: 'baja',
      created_at: new Date(),
      updated_at: new Date()
    },

    // Ejemplares para "En los zapatos de Valeria"
    {
      libro_id: 3, // En los zapatos de Valeria
      codigo_barra: '9788483655369-001',
      estado: 'disponible',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      libro_id: 3, // En los zapatos de Valeria
      codigo_barra: '9788483655369-002',
      estado: 'prestado',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      libro_id: 3, // En los zapatos de Valeria
      codigo_barra: '9788483655369-003',
      estado: 'reparacion',
      created_at: new Date(),
      updated_at: new Date()
    },

    // Ejemplares para "Cien años de soledad"
    {
      libro_id: 4, // Cien años de soledad
      codigo_barra: '9780060883287-001',
      estado: 'disponible',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      libro_id: 4, // Cien años de soledad
      codigo_barra: '9780060883287-002',
      estado: 'prestado',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      libro_id: 4, // Cien años de soledad
      codigo_barra: '9780060883287-003',
      estado: 'reparacion',
      created_at: new Date(),
      updated_at: new Date()
    },

    // Ejemplares para "La sombra del viento"
    {
      libro_id: 5, // La sombra del viento
      codigo_barra: '9788408172173-001',
      estado: 'disponible',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      libro_id: 5, // La sombra del viento
      codigo_barra: '9788408172173-002',
      estado: 'prestado',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      libro_id: 5, // La sombra del viento
      codigo_barra: '9788408172173-003',
      estado: 'baja',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('ejemplares', null, {});
}
