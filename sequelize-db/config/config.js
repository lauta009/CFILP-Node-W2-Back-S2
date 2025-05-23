const dotenv = require('dotenv');

dotenv.config({ path: require('path').resolve(__dirname, '../../.env') }); 

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Usa la variable de entorno
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: console.log, // es para ver los logs de las consultas SQL
  },
  test: {
    username: process.env.DB_TEST_USER || 'root',  
    password: process.env.DB_TEST_PASSWORD || null,
    database: process.env.DB_TEST_NAME || 'database_test',
    host: process.env.DB_TEST_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: process.env.DB_USER, //
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, // Usar DB_NAME para producción si es la misma
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // No hay logs en producción
  },
};