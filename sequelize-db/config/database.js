import { Sequelize } from 'sequelize'
import { config } from 'dotenv'
config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
)

// Función para sincronizar modelos
export const sync = async () => {
  try {
    await sequelize.sync({ force: false })
    console.log('Base de datos sincronizada.')
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error)
  }
}

export default sequelize
