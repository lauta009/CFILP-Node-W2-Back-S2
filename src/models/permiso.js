'use strict';
module.exports = (sequelize, DataTypes) => {
  const Permiso = sequelize.define('Permiso', {
    nombre: DataTypes.STRING
  }, {
    tableName: 'permisos',
    timestamps: true
  });

  Permiso.associate = function(models) {
    Permiso.belongsToMany(models.Rol, {
      through: 'roles_permisos',
      foreignKey: 'permiso_id',
      otherKey: 'rol_id'
    });
  };

  return Permiso;
};