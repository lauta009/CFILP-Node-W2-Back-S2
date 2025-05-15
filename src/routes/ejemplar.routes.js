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
const { obtenerEjemplarPorCodigoBarra } = require('../services/ejemplar.service');

const router = express.Router();

router.post(
  '/',
  crearEjemplarValidator,
  validarErrores, 
  ejemplaresController.crear
);

router.get(
  '/', 
  obtenerTodosLosEjemplaresValidator, 
  validarErrores, 
  ejemplaresController.obtenerTodos
);

router.get(
  '/:id',
  obtenerEjemplarPorIdValidator, 
  validarErrores, 
  ejemplaresController.obtenerUno
);

router.get(
  '/ejemplares/codigo/:codigo_barra',
  obtenerEjemplarPorCodigoBarraValidator, 
  validarErrores, 
  ejemplaresController.obtenerPorCodigoBarra
);

router.put(
  '/id/:id', 
  actualizarEjemplarValidator, 
  validarErrores, 
  ejemplaresController.actualizar
);

router.put(
  '/codigo/:codigo_barra', 
  actualizarEjemplarValidator, 
  validarErrores, 
  ejemplaresController.actualizar
);

router.delete(
  '/:id', 
  obtenerEjemplarPorIdValidator, 
  validarErrores, 
  ejemplaresController.eliminar
);

module.exports = router;