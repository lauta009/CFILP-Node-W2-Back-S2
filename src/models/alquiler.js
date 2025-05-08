'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alquiler = sequelize.define('Alquiler', {
    usuario_id: DataTypes.INTEGER,
    ejemplar_id: DataTypes.INTEGER,
    fecha_alquiler: DataTypes.DATE,
    fecha_vencimiento: DataTypes.DATE,
    fecha_devolucion: DataTypes.DATE,
    estado: {
      type: DataTypes.ENUM('pendiente', 'devuelto', 'atrasado')
    }
  }, {
    tableName: 'alquileres',
    timestamps: true
  });

  Alquiler.associate = function(models) {
    Alquiler.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    Alquiler.belongsTo(models.Ejemplar, { foreignKey: 'ejemplar_id' });
  };

  return Alquiler;
};