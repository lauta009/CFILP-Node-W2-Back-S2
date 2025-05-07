import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class RolPermiso extends Model {
    static associate(models) {
      RolPermiso.belongsTo(models.Rol, { foreignKey: 'rol_id' });
      RolPermiso.belongsTo(models.Permiso, { foreignKey: 'permiso_id' });
    }
  }

  RolPermiso.init({
    rol_id: DataTypes.INTEGER,
    permiso_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RolPermiso',
    tableName: 'roles_permisos',
    underscored: true
  });

  RolPermiso.addIndex('roles_permisos_rol_id_idx', ['rol_id']);
  RolPermiso.addIndex('roles_permisos_permiso_id_idx', ['permiso_id']);

  return RolPermiso;
};
