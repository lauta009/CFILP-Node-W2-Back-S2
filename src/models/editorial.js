'use strict';
module.exports = (sequelize, DataTypes) => {
  const Editorial = sequelize.define('Editorial', {
    nombre: DataTypes.STRING
  }, {
    tableName: 'editoriales',
    timestamps: true
  });

  Editorial.associate = function(models) {
    Editorial.hasMany(models.Libro, { foreignKey: 'editorial_id' });
  };

  return Editorial;
};