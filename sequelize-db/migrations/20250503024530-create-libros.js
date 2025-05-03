'use strict';
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('libros', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    titulo: {
      type: Sequelize.STRING
    },
    autor: {
      type: Sequelize.STRING
    },
    editorial: {
      type: Sequelize.STRING
    },
    fecha_publicacion: {
      type: Sequelize.DATE
    },
    isbn: {
      type: Sequelize.STRING(17),
      allowNull: false,
      unique: true,
      validate: {
        len: [10, 17],
        is: /^[0-9\-]{10,17}$/i
      }
    },
    cantidad_total: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    es_premium: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    categoria_id: {
      type: Sequelize.INTEGER
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('libros');
}