import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  await queryInterface.createTable('alquileres', {
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
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
  });

  await queryInterface.addIndex('alquileres', ['usuario_id', 'ejemplar_id']);

  await queryInterface.addIndex('alquileres', ['estado']);
  await queryInterface.addIndex('alquileres', ['fecha_vencimiento']);
}

export async function down(queryInterface) {
  await queryInterface.dropTable('alquileres');
}
