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
    isbn: {
      type: DataTypes.STRING(17),
      unique: true
    },
    resumen: DataTypes.TEXT,
    portada_url: DataTypes.STRING(255),
    idioma: DataTypes.STRING(50),
    nro_paginas: DataTypes.INTEGER,
    es_premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categorias',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Libro',
    tableName: 'libros',
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['isbn']
      },
      {
        fields: ['titulo']
      },
      {
        fields: ['es_premium']
      }
    ]
  });

  return Libro;
};
