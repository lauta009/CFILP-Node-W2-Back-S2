'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Libro extends Model {
    
    static associate(models) {
      Libro.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id',
        as: 'categoria'
      }); 
      Libro.hasMany(models.Alquiler, { foreignKey: 'libro_id' });
      Libro.belongsToMany(models.Usuario, {
        through: models.Alquiler,
        foreignKey: 'libro_id',
        otherKey: 'usuario_id'
      });
    }
  }
  Libro.init({
    titulo: DataTypes.STRING,
    autor: DataTypes.STRING,
    editorial: DataTypes.STRING,
    fecha_publicacion: DataTypes.DATE,
    isbn: DataTypes.STRING,
    cantidad_total: DataTypes.INTEGER,
    es_premium: DataTypes.BOOLEAN,
    categoria_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Libro',
    tableName: 'libros',
    underscored: true,
    timestamps: true,
  });
  
  return Libro;
};