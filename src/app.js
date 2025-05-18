const express = require('express');
const dotenv = require('dotenv');
const { sync } = require('../sequelize-db/config/database');
const setupSwagger = require('../docs/swagger');
const libroRoutes = require('./routes/libro.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const mi_perfilRoutes = require('./routes/mi_perfil.routes');

const {authMiddleware, permisosCheck} = require('./middlewares/auth.middleware');

const { sequelize } = require('../sequelize-db/config/database');
dotenv.config(); 

const app = express();

// Middlewares de aplicación
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// Rutas
app.use('/api', (req, res, next) => {

  if (req.path.startsWith('/auth')) return next(); // Excluye auth
  return authMiddleware(req, res, next);
});
app.use('/api', (req, res, next) => {
  if (req.path.startsWith('/auth')) return next(); // Excluye auth
  return permisosCheck(req, res, next);
});
app.use('/api/libros', libroRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/mi_perfil', mi_perfilRoutes);



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
