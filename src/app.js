const express = require('express');
const dotenv = require('dotenv');

const { sync } = require('../sequelize-db/config/database');

const globalErrorHandler = require('./middlewares/errorHandler.middleware');
const { NotFoundError } = require('./utils/appErrors');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Importación de las rutas
const libroRoutes = require('./routes/libro.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const mi_perfilRoutes = require('./routes/mi_perfil.routes');
const ejemplarRoutes = require('./routes/ejemplar.routes');
const alquilerRoutes = require('./routes/alquiler.routes');
const categoriaRoutes = require('./routes/categoria.routes');

const {authMiddleware, } = require('./middlewares/auth.middleware');
const esRutaPublica = require('./middlewares/rutasPublicas.middleware');


dotenv.config(); 
const path = require('path');

const app = express();

// Middlewares de aplicación
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yml'));

// Rutas públicas
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de la Biblioteca');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', authRoutes);


// Middlewares de autenticación y permisos para las rutas protegidas
app.use('/api', (req, res, next) => {
  if (esRutaPublica(req)) {
    return next(); // Saltar el middleware de autenticación
  }
  authMiddleware(req, res, next);
});

// Rutas protegidas
app.use('/api/libros', libroRoutes);
app.use('/api/alquileres', alquilerRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/ejemplares', ejemplarRoutes);
app.use('/api/users', userRoutes);
app.use('/api/mi-perfil', mi_perfilRoutes);


// Si una ruta no coincide con ninguna de las definidas arriba, llegará aquí.
app.use((req, res, next) => {
  next(new NotFoundError(`No se puede encontrar ${req.originalUrl} en este servidor!`));
});

// Manejador de errores
app.use(globalErrorHandler);


// Define el puerto que va a usar el servidor
// Usa process.env.PORT para entornos de despliegue,
// o el 3000 como default para desarrollo local.
const PORT = process.env.PORT || 3000; 

// Sincronización con la bbdd y arranque del servidor
sync()
  .then(() => {
    app.listen(PORT, () => { // Usa la variable PORT aquí
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`); 
      console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al sincronizar la base de datos:', err);
  });
