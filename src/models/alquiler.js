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
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    ejemplar_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ejemplares',
        key: 'id'
      }
    },
    fecha_alquiler: {
      type: DataTypes.DATE
    },
    fecha_vencimiento: {
      type: DataTypes.DATE
    },
    fecha_devolucion: {
      type: DataTypes.DATE
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'devuelto', 'atrasado')
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Alquiler',
    tableName: 'alquileres',
    underscored: true,
    timestamps: true,
    indexes: [
      {
        fields: ['usuario_id', 'ejemplar_id']
      },
      {
        fields: ['estado']
      },
      {
        fields: ['fecha_vencimiento']
      }
    ]
  });

  return Alquiler;
};
