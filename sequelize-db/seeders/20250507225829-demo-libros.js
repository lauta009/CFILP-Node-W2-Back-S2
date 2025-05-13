'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('libros', [
      {
        id: 1,
        titulo: 'El infinito en un junco',
        editorial_id: 1, // Penguin Random House
        fecha_publicacion: new Date('2019-09-18'),
        isbn: '9788417860790',
        resumen: 'Un ensayo que recorre la historia de los libros desde la antigüedad hasta nuestros días, explorando su impacto en la humanidad.',
        portada_url: 'https://imagessiruela.s3.amazonaws.com/9788417860790.jpg',
        idioma: 'Español',
        nro_paginas: 432,
        es_premium: true,
        categoria_id: 15, // Ensayo
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        titulo: 'Moscú 2042',
        editorial_id: 2, // Planeta
        fecha_publicacion: new Date('1986-01-01'),
        isbn: '9788432215472',
        resumen: 'Una novela distópica que satiriza el régimen soviético, proyectando un futuro donde el comunismo se ha instaurado completamente en Moscú.',
        portada_url: 'https://imagesplanetadelibros.s3.amazonaws.com/9788432215472.jpg',
        idioma: 'Español',
        nro_paginas: 320,
        es_premium: false,
        categoria_id: 2, // Ciencia Ficción
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        titulo: 'En los zapatos de Valeria',
        editorial_id: 3, // Alfaguara
        fecha_publicacion: new Date('2013-04-23'),
        isbn: '9788483655369',
        resumen: 'Primera novela de la saga Valeria, que narra las aventuras y desventuras amorosas de una joven escritora en Madrid.',
        portada_url: 'https://imagessuma.s3.amazonaws.com/9788483655369.jpg',
        idioma: 'Español',
        nro_paginas: 480,
        es_premium: false,
        categoria_id: 5, // Romance
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        titulo: 'Cien años de soledad',
        editorial_id: 5, // Editorial Sudamericana
        fecha_publicacion: new Date('1967-05-30'),
        isbn: '9780060883287',
        resumen: 'La historia de la familia Buendía en el mítico pueblo de Macondo, una obra cumbre del realismo mágico.',
        portada_url: 'https://imagessudamericana.s3.amazonaws.com/9780060883287.jpg',
        idioma: 'Español',
        nro_paginas: 417,
        es_premium: true,
        categoria_id: 1, // Ficción
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        titulo: 'La sombra del viento',
        editorial_id: 6, // Anagrama
        fecha_publicacion: new Date('2001-06-06'),
        isbn: '9788408172173',
        resumen: 'Un joven descubre un libro que cambiará su vida y lo llevará a desentrañar los secretos de un autor olvidado.',
        portada_url: 'https://imagesanagrama.s3.amazonaws.com/9788408172173.jpg',
        idioma: 'Español',
        nro_paginas: 576,
        es_premium: false,
        categoria_id: 4, // Policial
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('libros', null, {});
  }
};

