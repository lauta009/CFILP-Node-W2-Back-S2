const express = require('express');
const dotenv = require('dotenv');
const { sync } = require('../sequelize-db/config/database');
const setupSwagger = require('../docs/swagger');
const libroRoutes = require('./routes/libro.routes');
const ejemplarRoutes = require('./routes/ejemplar.routes');

dotenv.config(); 

const app = express();

// Middlewares de aplicación
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// Rutas
app.use('/api/libros', libroRoutes);
app.use('/api/ejemplares', ejemplarRoutes);


// Manejador de errores


// Documentación con swagger
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
