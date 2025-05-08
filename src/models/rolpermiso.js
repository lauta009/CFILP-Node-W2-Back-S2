'use strict';
module.exports = (sequelize, DataTypes) => {
  const RolPermiso = sequelize.define('RolPermiso', {
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    permiso_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'roles_permisos',
    timestamps: true  // tu tabla sí tiene created_at/updated_at
  });

  RolPermiso.associate = function(models) {
    RolPermiso.belongsTo(models.Rol,     { foreignKey: 'rol_id' });
    RolPermiso.belongsTo(models.Permiso, { foreignKey: 'permiso_id' });
  };

  return RolPermiso;
};