'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Usuario extends Model {

    static associate(models) {
      Usuario.belongsTo(models.Rol, {
        foreignKey: 'rol_id',
        as: 'rol'
      });
      Usuario.hasMany(models.Alquiler, { foreignKey: 'usuario_id' });
      Usuario.belongsToMany(models.Libro, {
        through: models.Alquiler,
        foreignKey: 'usuario_id',
        otherKey: 'libro_id'
      });
    }
  }
  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    rol_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: DataTypes.STRING,
    tipo_usuario: {
      type: DataTypes.ENUM('regular', 'premium'),
      defaultValue: 'regular'
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    underscored: true,
    timestamps: true,
  });
  return Usuario;
};