'use strict';



module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('usuarios', [
      // Usuario admin
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@admin.com',
        password: '$2b$10$8Pjk0h0c3K5y6F6fv5vfheZ5uV3S8nIbfsM1fs7kUbcmK9VbFv6ve',
        rol_id: 1,
        telefono: '1123456789',
        direccion: 'Av. Libertador 1234',
        localidad: 'Buenos Aires',
        nro_doc: 30123456,
        cod_postal: 1001,
        ultimo_login: new Date(),
        estado: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'María',
        apellido: 'Gómez',
        email: 'maria.gomez@user.com',
        password: '$2b$10$zUve1j7QFMyZn4mjKNn0Vu0oRXW9tEjVdMm94Ws3nsbdTpAYTniIa',
        rol_id: 2,
        telefono: '1134567890',
        direccion: 'Calle Falsa 456',
        localidad: 'Santa Fe',
        nro_doc: 32123456,
        cod_postal: 3000,
        ultimo_login: new Date(),
        estado: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Carlos',
        apellido: 'López',
        email: 'carlos.lopez@user.com',
        password: '$2b$10$8Jyxh9A7wCz61zHaeq3Fd.Nl4gH0bFslqb56t9qlFcEvZb8YOaOYO',
        rol_id: 2,
        telefono: '1145678901',
        direccion: 'Calle Siempre Viva 742',
        localidad: 'Córdoba',
        nro_doc: 33123456,
        cod_postal: 5000,
        ultimo_login: new Date(),
        estado: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Laura',
        apellido: 'Martínez',
        email: 'laura.martinez@user.com',
        password: '$2b$10$3A3F1FvK7uGL3T5rAEMqQvKg05I2a6akjfrT75wwuZT5BWsHxeo4q',
        rol_id: 2,
        telefono: '1156789012',
        direccion: 'Ruta 19, km 15',
        localidad: 'Mendoza',
        nro_doc: 34123456,
        cod_postal: 5500,
        ultimo_login: new Date(),
        estado: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
