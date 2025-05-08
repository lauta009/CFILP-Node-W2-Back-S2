'use strict';

module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    nombre: DataTypes.STRING,
    categoria_padre_id: DataTypes.INTEGER
  }, {
    tableName: 'categorias',
    timestamps: true
  });

  Categoria.associate = function(models) {
    Categoria.belongsTo(models.Categoria, {
      as: 'padre',
      foreignKey: 'categoria_padre_id'
    });
    Categoria.hasMany(models.Categoria, {
      as: 'hijas',
      foreignKey: 'categoria_padre_id'
    });
    Categoria.hasMany(models.Libro, {
      foreignKey: 'categoria_id'
    });
  };

  return Categoria;
};