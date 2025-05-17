const express = require('express');
const categoriaController = require('../controllers/categoria.controller');
const {
  crearCategoriaValidaciones,
  obtenerCategoriaPorIdValidaciones,
  actualizarCategoriaValidaciones,
  eliminarCategoriaValidaciones,
} = require('../middlewares/validaciones/categoria.validaciones');
const validarErrores = require('../middlewares/validaciones/validarErrores');

const router = express.Router();

router.post('/', crearCategoriaValidaciones, validarErrores, categoriaController.crearCategoriaController);

router.get('/obtener-una/:id', obtenerCategoriaPorIdValidaciones, validarErrores, categoriaController.obtenerCategoriaPorIdController);

router.put('/:id', actualizarCategoriaValidaciones, validarErrores, categoriaController.actualizarCategoriaController);

router.delete('/:id', eliminarCategoriaValidaciones, validarErrores, categoriaController.eliminarCategoriaController);

router.get('/arbol', categoriaController.obtenerCategoriasArbolController);
router.get('/arbol-con-libros', categoriaController.obtenerCategoriasArbolConLibrosController);

router.get('/', categoriaController.obtenerTodasLasCategoriasController);

module.exports = router;