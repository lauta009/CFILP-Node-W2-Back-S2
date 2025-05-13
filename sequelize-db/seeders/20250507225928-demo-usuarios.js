'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usuarios', [
      // Usuario admin
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        email: 'juan.perez@admin.com',
        password: '$2b$10$8Pjk0h0c3K5y6F6fv5vfheZ5uV3S8nIbfsM1fs7kUbcmK9VbFv6ve', // contraseña cifrada
        telefono: '1123456789',
        direccion: 'Av. Libertador 1234',
        localidad: 'Buenos Aires',
        ultimo_login: new Date(),
        estado: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Usuario regular 1
      {
        nombre: 'María',
        apellido: 'Gómez',
        email: 'maria.gomez@user.com',
        password: '$2b$10$zUve1j7QFMyZn4mjKNn0Vu0oRXW9tEjVdMm94Ws3nsbdTpAYTniIa', // contraseña cifrada
        telefono: '1134567890',
        direccion: 'Calle Falsa 456',
        localidad: 'Santa Fe',
        ultimo_login: new Date(),
        estado: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Usuario regular 2
      {
        nombre: 'Carlos',
        apellido: 'López',
        email: 'carlos.lopez@user.com',
        password: '$2b$10$8Jyxh9A7wCz61zHaeq3Fd.Nl4gH0bFslqb56t9qlFcEvZb8YOaOYO', // contraseña cifrada
        telefono: '1145678901',
        direccion: 'Calle Siempre Viva 742',
        localidad: 'Córdoba',
        ultimo_login: new Date(),
        estado: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      // Usuario regular 3
      {
        nombre: 'Laura',
        apellido: 'Martínez',
        email: 'laura.martinez@user.com',
        password: '$2b$10$3A3F1FvK7uGL3T5rAEMqQvKg05I2a6akjfrT75wwuZT5BWsHxeo4q', // contraseña cifrada
        telefono: '1156789012',
        direccion: 'Ruta 19, km 15',
        localidad: 'Mendoza',
        ultimo_login: new Date(),
        estado: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
