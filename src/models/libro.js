const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Libro extends Model {
    static associate(models) {
      Libro.belongsTo(models.Editorial, {
        foreignKey: 'editorial_id',
        as: 'editorial'
      });

      Libro.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id',
        as: 'categoria'
      });

      Libro.belongsToMany(models.Autor, {
        through: models.AutoresLibros,
        foreignKey: 'libro_id',
        otherKey: 'autor_id',
        as: 'autores'
      });

      Libro.hasMany(models.Ejemplar, {
        foreignKey: 'libro_id',
        as: 'ejemplares'
      });
    }
  }

  Libro.init({
    titulo: DataTypes.STRING(150),
    editorial_id: DataTypes.INTEGER,
    fecha_publicacion: DataTypes.DATE,
    isbn: DataTypes.STRING(17),
    resumen: DataTypes.TEXT,
    portada_url: DataTypes.STRING(255),
    idioma: DataTypes.STRING(50),
    nro_paginas: DataTypes.INTEGER,
    es_premium: DataTypes.BOOLEAN,
    categoria_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Libro',
    tableName: 'libros',
    underscored: true,
    timestamps: true
  });

  Libro.addIndex(['isbn']);
  Libro.addIndex(['titulo']);
  Libro.addIndex(['es_premium']);

  return Libro;
};
