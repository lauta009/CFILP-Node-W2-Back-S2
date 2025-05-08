'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ejemplar = sequelize.define('Ejemplar', {
    libro_id: DataTypes.INTEGER,
    codigo_barra: {
      type: DataTypes.STRING,
      unique: true
    },
    estado: {
      type: DataTypes.ENUM('disponible', 'prestado', 'reparacion', 'baja')
    }
  }, {
    tableName: 'ejemplares',
    timestamps: true
  });

  Ejemplar.associate = function(models) {
    Ejemplar.belongsTo(models.Libro, { foreignKey: 'libro_id' });
    Ejemplar.hasMany(models.Alquiler, { foreignKey: 'ejemplar_id' });
  };

  return Ejemplar;
};