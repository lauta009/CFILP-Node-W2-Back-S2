'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rol = sequelize.define('Rol', {
    nombre: DataTypes.STRING
  }, {
    tableName: 'roles',
    timestamps: true
  });

  Rol.associate = function(models) {
    Rol.belongsToMany(models.Permiso, {
      through: 'roles_permisos',
      foreignKey: 'rol_id',
      otherKey: 'permiso_id'
    });
    Rol.belongsToMany(models.Usuario, {
      through: 'usuario_roles',
      foreignKey: 'rol_id',
      otherKey: 'usuario_id'
    });
  };

  return Rol;
};