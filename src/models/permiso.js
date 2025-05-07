import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Permiso extends Model {
    static associate(models) {
      Permiso.belongsToMany(models.Rol, {
        through: models.RolPermiso,
        foreignKey: 'permiso_id',
        as: 'roles'
      });
    }
  }

  Permiso.init({
    nombre: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Permiso',
    tableName: 'permisos',
    underscored: true
  });

  return Permiso;
};
