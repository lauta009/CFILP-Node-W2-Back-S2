import express from 'express';
import dotenv from 'dotenv';
import { sync } from '../sequelize-db/config/database.js';
import setupSwagger from '../docs/swagger.js';

dotenv.config(); // Cargar variables de entorno

const app = express();

// Middlewares
app.use(express.json());

// Rutas

// Manejador de errores

//Documentacin con swagger
setupSwagger(app);

// Sincronización con la bbdd y arranque del servidor
sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('✅ Servidor corriendo en http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar la base de datos:', err);
  });

app.listen(3000, () => {
  console.log('✅ Servidor corriendo en http://localhost:3000');
});
