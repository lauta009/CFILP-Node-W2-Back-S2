import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Rol extends Model {
    static associate(models) {
      Rol.belongsToMany(models.Usuario, {
        through: models.UsuarioRol,
        foreignKey: 'rol_id',
        as: 'usuarios'
      });
      Rol.belongsToMany(models.Permiso, {
        through: models.RolPermiso,
        foreignKey: 'rol_id',
        as: 'permisos'
      });
    }
  }

  Rol.init({
    nombre: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles',
    underscored: true
  });

  return Rol;
};
