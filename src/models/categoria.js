const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Categoria extends Model {
    static associate(models) {
      Categoria.belongsTo(models.Categoria, {
        as: 'padre',
        foreignKey: 'categoria_padre_id'
      });
      Categoria.hasMany(models.Categoria, {
        as: 'subcategorias',
        foreignKey: 'categoria_padre_id'
      });
      Categoria.hasMany(models.Libro, {
        foreignKey: 'categoria_id',
        as: 'libros'
      });
    }
  }
  Categoria.init({
    nombre: DataTypes.STRING,
    categoria_padre_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    underscored: true,
    timestamps: true,
  });


  return Categoria;
};
