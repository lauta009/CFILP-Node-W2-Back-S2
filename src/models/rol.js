'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {

    static associate(models) {
      Rol.hasMany(models.Usuario, {
        foreignKey: 'rol_id',
        as: 'usuarios'
      });
      Rol.belongsToMany(models.Permiso, {
        through: 'roles_permisos',
        foreignKey: 'rol_id',
        as: 'permisos',
      });
    }
  }
  Rol.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
    tableName: 'roles',
    underscored: true,
    timestamps: true,
  });
  return Rol;
};