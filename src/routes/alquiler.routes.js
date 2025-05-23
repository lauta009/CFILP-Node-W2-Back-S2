const express = require('express');
const alquilerController = require('../controllers/alquiler.controller');
const {
  crearAlquilerValidator,
  devolverAlquilerValidator,
  obtenerAlquilerPorIdValidator,
} = require('../middlewares/validaciones/alquiler.validaciones'); 
const validarErrores = require('../middlewares/validaciones/validarErrores');
const { checkRolYPermisos } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', checkRolYPermisos('admin',['gestionar_libros']), alquilerController.obtenerTodosLosAlquileres);

router.get('/obtener-uno/:id', checkRolYPermisos('admin',['gestionar_libros']),  obtenerAlquilerPorIdValidator, validarErrores, alquilerController.obtenerAlquilerPorId);

router.get('/activos', checkRolYPermisos('admin',['gestionar_libros']),  alquilerController.obtenerAlquileresActivos);

router.get('/vencidos', checkRolYPermisos('admin',['gestionar_libros']), alquilerController.obtenerAlquileresActivosVencidos);

router.post('/regular', checkRolYPermisos(['usuario', 'admin'],['alquilar_libro']),  crearAlquilerValidator, validarErrores, alquilerController.crearAlquilerRegular);

router.post('/premium', checkRolYPermisos(['usuario_premium', 'admin'],['alquilar_libro_premium']), crearAlquilerValidator, validarErrores, alquilerController.crearAlquilerPremium);

router.post('/devolucion', devolverAlquilerValidator, validarErrores, alquilerController.devolverEjemplar);

module.exports = router;