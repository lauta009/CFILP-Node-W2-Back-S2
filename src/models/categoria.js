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
    nombre:{
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    categoria_padre_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categorias',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  }, {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    underscored: true,
    timestamps: true,
  });


  return Categoria;
};
