const express = require('express');
const dotenv = require('dotenv');
const { sync } = require('../sequelize-db/config/database');
const globalErrorHandler = require('./middlewares/errorHandler.middleware');
const { NotFoundError } = require('./utils/appErrors');
const setupSwagger = require('../docs/swagger');

// Importación de las rutas
const libroRoutes = require('./routes/libro.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const mi_perfilRoutes = require('./routes/mi_perfil.routes');
const ejemplarRoutes = require('./routes/ejemplar.routes');
const alquilerRoutes = require('./routes/alquiler.routes');
const categoriaRoutes = require('./routes/categoria.routes');

const {authMiddleware, permisosCheck} = require('./middlewares/auth.middleware');
const esRutaPublica = require('./middlewares/rutasPublicas.middleware');

dotenv.config(); 

const app = express();

// Middlewares de aplicación
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// Rutas públicas
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de la Biblioteca');
});
app.use('/api/auth', authRoutes);
app.get('/api/libros', libroRoutes);
app.get('/api/ejemplares', ejemplarRoutes);

// Middlewares de autenticación y permisos para las rutas protegidas
app.use('/api', (req, res, next) => {
  if (esRutaPublica(req)) {
    return next(); // Saltar el middleware de autenticación
  }
  authMiddleware(req, res, next);
});

app.use('/api', (req, res, next) => {
  if (esRutaPublica(req)) {
    return next(); // Saltar el middleware de permisos
  }
  permisosCheck(req, res, next);
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
