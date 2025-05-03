'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Categoria extends Model {
 
    static associate(models) {
      Categoria.hasMany(models.Libro, {
        foreignKey: 'categoria_id',
        as: 'libros'
      });
    }
  }
  Categoria.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    underscored: true,
    timestamps: true,
  });
  return Categoria;
};