'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    localidad: DataTypes.STRING,
    ultimo_login: DataTypes.DATE,
    estado: DataTypes.BOOLEAN
  }, {
    tableName: 'usuarios',
    timestamps: true
  });

  Usuario.associate = function(models) {
    Usuario.hasMany(models.Alquiler, { foreignKey: 'usuario_id' });
    Usuario.belongsToMany(models.Rol, {
      through: 'usuario_roles',
      foreignKey: 'usuario_id',
      otherKey: 'rol_id'
    });
  };

  return Usuario;
};