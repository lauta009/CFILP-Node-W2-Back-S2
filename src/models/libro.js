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
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    editorial_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'editoriales',
        key: 'id',
      },
    },
    saga_coleccion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    fecha_publicacion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING(17),
      unique: true,
      allowNull: false,
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    portada_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    idioma: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    nro_paginas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    es_premium: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categorias',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Libro',
    tableName: 'libros',
    underscored: true,
    timestamps: true, 
    indexes: [
      {
        fields: ['titulo', 'isbn', 'es_premium'],
      },
    ],
  });
  return Libro;
};