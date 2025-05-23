const express = require('express');
const dotenv = require('dotenv');
const { sync } = require('../sequelize-db/config/database');
//const setupSwagger = require('../docs/swagger');
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

const {authMiddleware, permisosCheck} = require('./middlewares/auth.middleware');
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

// Manejador de errores


// Documentación con swagger
//setupSwagger(app);

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
