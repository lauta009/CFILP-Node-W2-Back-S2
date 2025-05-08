'use strict';
module.exports = (sequelize, DataTypes) => {
  const Autor = sequelize.define('Autor', {
    apellido: DataTypes.STRING,
    nombre: DataTypes.STRING
  }, {
    tableName: 'autores',
    timestamps: true
  });

  Autor.associate = function(models) {
    Autor.belongsToMany(models.Libro, {
      through: 'autores_libros',
      foreignKey: 'autor_id',
      otherKey: 'libro_id'
    });
  };

  return Autor;
};