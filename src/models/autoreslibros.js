const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class AutoresLibros extends Model {}

  AutoresLibros.init({
    autor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    libro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'AutoresLibros',
    tableName: 'autores_libros',
    underscored: true,
    timestamps: true
  });

  return AutoresLibros;
};

