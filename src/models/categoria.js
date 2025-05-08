'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
 
    static associate(models) {
      Categoria.hasMany(models.Libro, {
        foreignKey: 'categoria_id',
        as: 'libros'
      });
      Categoria.belongsTo(Categoria, { 
        as: 'parent',
        foreignKey: 'categoria_id' });
      Categoria.hasMany(Categoria, { 
        as: 'subcategorias', 
        foreignKey: 'categoria_id' });
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