const express = require('express');
const router = express.Router();

const libroController = require('../Controllers/libro.controller');

const { crearLibroValidator, idLibroValidator } = require('../middlewares/validaciones/libro.validaciones');
const validarErrores = require('../middlewares/validaciones/validarErrores');

//Rutas basicas del CRUD de libros
router.get('/', libroController.listar);

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
router.get('/libros-con-ejemplares', libroController.obtenerLibrosConEjemplares);
router.get('/libros-disponibles', libroController.obtenerLibrosConEjemplaresDisponibles);
router.get('/libros-prestados', libroController.obtenerLibrosConEjemplaresPrestados);
router.get('/libros-en-reparacion', libroController.obtenerLibrosConEjemplaresEnReparacion);
router.get('/libros-en-baja', libroController.obtenerLibrosConEjemplaresBaja);

module.exports = router;