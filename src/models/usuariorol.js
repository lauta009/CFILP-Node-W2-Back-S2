const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class UsuarioRol extends Model {
    static associate(models) {
      UsuarioRol.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      UsuarioRol.belongsTo(models.Rol, { foreignKey: 'rol_id' });
    }
  }

  UsuarioRol.init({
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'UsuarioRol',
    tableName: 'usuario_roles',
    underscored: true,
    timestamps: true  
  });

  return UsuarioRol;
};
