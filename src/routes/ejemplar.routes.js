// ejemplares.routes.js
const express = require('express');
const ejemplaresController = require('../controllers/ejemplar.controller');
const {
  crearEjemplarValidator,
  actualizarEjemplarValidator,
  obtenerEjemplarPorIdValidator,
  obtenerTodosLosEjemplaresValidator,
  obtenerEjemplarPorCodigoBarraValidator
} = require('../middlewares/validaciones/ejemplar.validaciones');
const validarErrores = require('../middlewares/validaciones/validarErrores');
const { checkRolYPermisos, authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post(
  '/',
  checkRolYPermisos('admin',['gestionar_ejemplar']),
  crearEjemplarValidator,
  validarErrores, 
  ejemplaresController.crear
);

router.get(
  '/',
  //authMiddleware,
  //checkRolYPermisos(['usuario', 'admin', 'usuario_premium'],['consultar_ejemplar']), 
  obtenerTodosLosEjemplaresValidator, 
  validarErrores, 
  ejemplaresController.obtenerTodos
);

router.get(
  '/:id',
  //authMiddleware,
  //checkRolYPermisos(['usuario', 'admin', 'usuario_premium'],['consultar_ejemplar']),
  obtenerEjemplarPorIdValidator, 
  validarErrores, 
  ejemplaresController.obtenerUno
);

router.get(
  '/ejemplares/codigo/:codigo_barra',
  authMiddleware,
  checkRolYPermisos('admin', ['consultar_ejemplar']),
  obtenerEjemplarPorCodigoBarraValidator, 
  validarErrores, 
  ejemplaresController.obtenerPorCodigoBarra
);

router.get(
  '/disponibles-por-libro', 
  //authMiddleware,
  //checkRolYPermisos(['admin', 'regular', 'premium'], ['consultar_ejemplar']), 
  ejemplaresController.obtenerEjemplaresDisponiblesDeLibro
);

router.put(
  '/actualizar/:id', 
  checkRolYPermisos('admin',['gestionar_ejemplar']),
  actualizarEjemplarValidator, 
  validarErrores, 
  ejemplaresController.actualizar
);

router.put(
  '/codigo/:codigo_barra',
  checkRolYPermisos('admin',['gestionar_ejemplar']), 
  actualizarEjemplarValidator, 
  validarErrores, 
  ejemplaresController.actualizar
);

router.delete(
  '/:id', 
  checkRolYPermisos('admin',['gestionar_ejemplar']),
  obtenerEjemplarPorIdValidator, 
  validarErrores, 
  ejemplaresController.eliminar
);

module.exports = router;