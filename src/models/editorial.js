const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Editorial extends Model {
    static associate(models) {
      Editorial.hasMany(models.Libro, {
        foreignKey: 'editorial_id',
        as: 'libros'
      });
    }
  }

  Editorial.init({
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Editorial',
    tableName: 'editoriales',
    underscored: true,
    timestamps: true
  });

  return Editorial;
};
