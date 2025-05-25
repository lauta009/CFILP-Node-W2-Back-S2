const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Permiso extends Model {
    static associate(models) {
      Permiso.belongsToMany(models.Rol, {
        through: models.RolPermiso,
        foreignKey: 'permiso_id',
        otherKey: 'rol_id',
        as: 'roles'
      });
    }
  }

  Permiso.init({
    nombre: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Permiso',
    tableName: 'permisos',
    underscored: true,  
    timestamps: true,
  });
  return Permiso;
};
