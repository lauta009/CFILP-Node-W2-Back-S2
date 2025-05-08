'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsuarioRol = sequelize.define('UsuarioRol', {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'usuario_roles',
    timestamps: true  // tu tabla sí tiene created_at/updated_at
  });

  UsuarioRol.associate = function(models) {
    UsuarioRol.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    UsuarioRol.belongsTo(models.Rol,     { foreignKey: 'rol_id' });
  };

  return UsuarioRol;
};