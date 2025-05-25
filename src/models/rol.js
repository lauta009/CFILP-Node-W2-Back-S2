const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Rol extends Model {
    static associate(models) {
      Rol.hasMany(models.Usuario, {
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
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Rol',
    tableName: 'roles',
    underscored: true
  });

  return Rol;
};
