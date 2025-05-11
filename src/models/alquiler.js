const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Alquiler extends Model {
    static associate(models) {
      Alquiler.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      Alquiler.belongsTo(models.Ejemplar, { foreignKey: 'ejemplar_id' });
    }
  }

  Alquiler.init({
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios', // tabla relacionada
        key: 'id'
      }
    },
    ejemplar_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ejemplares',
        key: 'id'
      }
    },
    fecha_alquiler: DataTypes.DATE,
    fecha_vencimiento: DataTypes.DATE,
    fecha_devolucion: DataTypes.DATE,
    estado: {
      type: DataTypes.ENUM('pendiente', 'devuelto', 'atrasado')
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Alquiler',
    tableName: 'alquileres',
    underscored: true
  });

  Alquiler.addIndex(['usuario_id', 'ejemplar_id']);
  Alquiler.addIndex(['estado']);
  Alquiler.addIndex(['fecha_vencimiento']);

  return Alquiler;
};
