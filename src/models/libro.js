'use strict';
module.exports = (sequelize, DataTypes) => {
  const Libro = sequelize.define('Libro', {
    titulo: DataTypes.STRING,
    editorial_id: DataTypes.INTEGER,
    fecha_publicacion: DataTypes.DATE,
    isbn: DataTypes.STRING,
    resumen: DataTypes.TEXT,
    portada_url: DataTypes.STRING,
    idioma: DataTypes.STRING,
    nro_paginas: DataTypes.INTEGER,
    es_premium: DataTypes.BOOLEAN,
    categoria_id: DataTypes.INTEGER
  }, {
    tableName: 'libros',
    timestamps: true
  });

  Libro.associate = function(models) {
    Libro.belongsTo(models.Editorial, { foreignKey: 'editorial_id' });
    Libro.belongsTo(models.Categoria, { foreignKey: 'categoria_id' });
    Libro.belongsToMany(models.Autor, {
      through: 'autores_libros',
      foreignKey: 'libro_id',
      otherKey: 'autor_id'
    });
    Libro.hasMany(models.Ejemplar, { foreignKey: 'libro_id' });
  };

  return Libro;
};