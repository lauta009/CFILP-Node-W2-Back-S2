const { Model, DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  class RolPermiso extends Model {
    static associate(models) {
      RolPermiso.belongsTo(models.Rol, { foreignKey: 'rol_id' });
      RolPermiso.belongsTo(models.Permiso, { foreignKey: 'permiso_id' });
    }
  }

  RolPermiso.init({
    rol_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    permiso_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
  }, {
    sequelize,
    modelName: 'RolPermiso',
    tableName: 'roles_permisos',
    underscored: true,
    timestamps: true
  });

  return RolPermiso;
};

