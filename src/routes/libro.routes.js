const express = require('express');
const router = express.Router();

const libroController = require('../Controllers/libro.controller');

const { crearLibroValidator, idLibroValidator, listarLibrosValidator, estadoValidator } = require('../middlewares/validaciones/libro.validaciones');
const validarErrores = require('../middlewares/validaciones/validarErrores');

//Rutas basicas del CRUD de libros

router.get(
  '/', 
  listarLibrosValidator,
  validarErrores,
  libroController.listar);

router.get('/obtener-uno/:id',
  idLibroValidator,
  validarErrores,
  libroController.obtenerPorId
);

router.post(
  '/',
  crearLibroValidator,
  validarErrores,
  libroController.crear
);

router.put('/:id',
  idLibroValidator,
  crearLibroValidator,
  validarErrores,
  libroController.actualizar
);

router.delete('/:id',
  idLibroValidator,
  validarErrores,
  libroController.eliminar
);

// Rutas para obtener libros y ejemplares
router.get('/metricas', libroController.obtenerMetricasLibros);
router.get('/ejemplares', libroController.obtenerLibrosConEjemplares);
router.get('/ejemplares/:estado', estadoValidator, validarErrores, libroController.obtenerLibrosConEjemplaresPorEstado);

// Rutas para obtener libros más alquilados
router.get('/mas-alquilados/historico', libroController.obtenerLibrosMasAlquiladosHistorico);


module.exports = router;

