'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('autores_libros', {
    autor_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'autores', key: 'id' },
      onDelete: 'CASCADE'
    },
    libro_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'libros', key: 'id' },
      onDelete: 'CASCADE'
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  });

  await queryInterface.addConstraint('autores_libros', {
    fields: ['autor_id', 'libro_id'],
    type: 'primary key',
    name: 'pk_autores_libros'
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('autores_libros');
}
