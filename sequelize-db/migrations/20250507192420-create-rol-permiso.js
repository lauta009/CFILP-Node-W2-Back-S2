import { DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('roles_permisos', {
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'roles', key: 'id' }
    },
    permiso_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'permisos', key: 'id' }
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  });

  await queryInterface.addIndex('roles_permisos', ['rol_id'], {
    name: 'roles_permisos_rol_id_idx'
  });
  await queryInterface.addIndex('roles_permisos', ['permiso_id'], {
    name: 'roles_permisos_permiso_id_idx'
  });
}

export async function down(queryInterface) {
  await queryInterface.removeIndex('roles_permisos', 'roles_permisos_rol_id_idx');
  await queryInterface.removeIndex('roles_permisos', 'roles_permisos_permiso_id_idx');
  await queryInterface.dropTable('roles_permisos');
}
