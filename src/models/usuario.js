'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      // Un usuario puede tener muchos alquileres
      Usuario.hasMany(models.Alquiler, {
        foreignKey: 'usuario_id',
        as: 'alquileres',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      Usuario.belongsToMany(models.Rol, {
        through: models.UsuarioRol,
        foreignKey: 'usuario_id',
        otherKey: 'rol_id',
        as: 'roles',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  Usuario.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    direccion: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    localidad: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    ultimo_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    underscored: true,
    timestamps: false,
  });

  Usuario.addIndex('usuarios_email_idx', ['email']);

  return Usuario;
};

