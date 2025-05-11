const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Autor extends Model {
    static associate(models) {
      Autor.belongsToMany(models.Libro, {
        through: models.AutoresLibros,
        foreignKey: 'autor_id',
        otherKey: 'libro_id',
        as: 'libros'
      });
    }
  }

  Autor.init({
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Autor',
    tableName: 'autores',
    underscored: true
  });

  return Autor;
};
