import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class UsuarioRol extends Model {
    static associate(models) {
      UsuarioRol.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      UsuarioRol.belongsTo(models.Rol, { foreignKey: 'rol_id' });
    }
  }

  UsuarioRol.init({
    usuario_id: DataTypes.INTEGER,
    rol_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'UsuarioRol',
    tableName: 'usuario_roles',
    underscored: true
  });

  UsuarioRol.addIndex('usuario_roles_usuario_id_idx', ['usuario_id']);
  UsuarioRol.addIndex('usuario_roles_rol_id_idx', ['rol_id']);


  return UsuarioRol;
};
