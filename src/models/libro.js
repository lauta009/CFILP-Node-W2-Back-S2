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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    editorial_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'editoriales',
        key: 'id'
      }
    },
    fecha_publicacion: DataTypes.DATE,
    isbn: DataTypes.STRING,
    cantidad_total: DataTypes.INTEGER,
    es_premium: DataTypes.BOOLEAN,
    categoria_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'libros',
    underscored: true,
    timestamps: true,
  });
  
  return Libro;
};
