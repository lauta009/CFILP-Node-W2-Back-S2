import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('autores_libros', {
    libro_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'libros',
        key: 'id'
      }
    },
    autor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'autores',
        key: 'id'
      }
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  });

  await queryInterface.addIndex('autores_libros', ['libro_id', 'autor_id'], { unique: true });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('autores_libros');
}
