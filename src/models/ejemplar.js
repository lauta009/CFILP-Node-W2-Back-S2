const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Ejemplar extends Model {
    static associate(models) {
      Ejemplar.belongsTo(models.Libro, {
        foreignKey: 'libro_id',
        as: 'libro'
      });

      Ejemplar.hasMany(models.Alquiler, {
        foreignKey: 'ejemplar_id',
        as: 'alquileres'
      });
    }
  }

  Ejemplar.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    libro_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    codigo_barra: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    estado: {
      type: DataTypes.ENUM('disponible', 'prestado', 'reparacion', 'baja'),
      allowNull: false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ejemplar',
    tableName: 'ejemplares',
    underscored: true
  });

  return Ejemplar;
};
