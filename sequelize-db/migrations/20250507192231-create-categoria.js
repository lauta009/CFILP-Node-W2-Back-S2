'use strict';
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('categorias', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    categoria_padre_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'categorias',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true 
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
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('categorias');
}
