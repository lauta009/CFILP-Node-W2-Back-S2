const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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
    tableName: 'permisos',
    underscored: true,  
    timestamps: true,
  });
  return Permiso;
};
