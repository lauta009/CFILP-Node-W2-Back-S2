'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('usuarios', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nombre: {
      type: Sequelize.STRING(100)
    },
    apellido: {
      type: Sequelize.STRING(100)
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true
    },
    password: {
      type: Sequelize.STRING(255)
    },
    telefono: {
      type: Sequelize.STRING(20)
    },
    direccion: {
      type: Sequelize.STRING(150)
    },
    localidad: {
      type: Sequelize.STRING(100)
    },
    ultimo_login: {
      type: Sequelize.DATE
    },
    estado: {
      type: Sequelize.BOOLEAN
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

  await queryInterface.addIndex('usuarios', ['email'], {
    name: 'usuarios_email_idx'
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('usuarios');
}
