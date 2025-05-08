'use strict';
module.exports = (sequelize, DataTypes) => {
  const AutorLibro = sequelize.define('AutorLibro', {
    autor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    libro_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'autores_libros',
    timestamps: true
  });

  AutorLibro.associate = function(models) {
    AutorLibro.belongsTo(models.Autor, { foreignKey: 'autor_id' });
    AutorLibro.belongsTo(models.Libro, { foreignKey: 'libro_id' });
  };

  return AutorLibro;
};