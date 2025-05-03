'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Alquiler extends Model {
   
    static associate(models) {
      Alquiler.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });
      Alquiler.belongsTo(models.Libro, {
        foreignKey: 'libro_id',
        as: 'libro'
      });
    }
  }
  Alquiler.init({
    usuario_id: DataTypes.INTEGER,
    libro_id: DataTypes.INTEGER,
    fecha_alquiler: DataTypes.DATE,
    fecha_devolucion: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Alquiler',
    tableName: 'alquileres',
    underscored: true,
    timestamps: true,
  });
  return Alquiler;
};