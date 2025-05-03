'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Permiso extends Model {

    static associate(models) {
      Permiso.belongsToMany(models.Rol, {
        through: 'RolPermiso',
        foreignKey: 'permiso_id',
        otherKey: 'rol_id',
        as: 'roles'
      });
    }
  }
  Permiso.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permiso',
    tableName: 'permisos',
    underscored: true,  
    timestamps: true,
  });
  return Permiso;
};