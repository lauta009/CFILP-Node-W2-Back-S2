const express = require('express');
const router = express.Router();

const libroController = require('../controllers/libro.controller');

const { crearLibroValidator, idLibroValidator, listarLibrosValidator, estadoValidator, buscarLibrosValidaciones } = require('../middlewares/validaciones/libro.validaciones');
const validarErrores = require('../middlewares/validaciones/validarErrores');
const { checkRolYPermisos, authMiddleware } = require('../middlewares/auth.middleware');

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

router.get('/buscar',
  buscarLibrosValidaciones, 
  validarErrores, 
  libroController.buscarLibrosController
); 

router.post(
  '/',
  checkRolYPermisos('admin',['gestionar_libros']),
  crearLibroValidator,
  validarErrores,
  libroController.crear
);

router.put('/:id',
  checkRolYPermisos('admin',['gestionar_libros']),
  idLibroValidator,
  crearLibroValidator,
  validarErrores,
  libroController.actualizar
);

router.delete('/:id',
  checkRolYPermisos('admin',['gestionar_libros']),
  idLibroValidator,
  validarErrores,
  libroController.eliminar
);

// Rutas para obtener libros y ejemplares

router.get('/metricas', authMiddleware, checkRolYPermisos(['admin', 'usuario_premium'],['consultar_libros']), libroController.obtenerMetricasLibros); // Solo usuarios admin y premium

router.get('/ejemplares', libroController.obtenerLibrosConEjemplares);

router.get('/ejemplares/:estado', estadoValidator, validarErrores, libroController.obtenerLibrosConEjemplaresPorEstado);

// Rutas para obtener libros más alquilados
router.get('/mas-alquilados/historico', libroController.obtenerLibrosMasAlquiladosHistorico);


module.exports = router;

