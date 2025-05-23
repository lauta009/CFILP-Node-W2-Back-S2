const express = require('express');
const categoriaController = require('../controllers/categoria.controller');
const {
  crearCategoriaValidaciones,
  obtenerCategoriaPorIdValidaciones,
  actualizarCategoriaValidaciones,
  eliminarCategoriaValidaciones,
} = require('../middlewares/validaciones/categoria.validaciones');
const validarErrores = require('../middlewares/validaciones/validarErrores');
const { checkRolYPermisos } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', checkRolYPermisos(['admin'], ['gestionar_categorias']), crearCategoriaValidaciones, validarErrores, categoriaController.crearCategoriaController);

router.get('/obtener-una/:id', obtenerCategoriaPorIdValidaciones, validarErrores, categoriaController.obtenerCategoriaPorIdController);

router.put('/:id', checkRolYPermisos(['admin'], ['gestionar_categorias']),  actualizarCategoriaValidaciones, validarErrores, categoriaController.actualizarCategoriaController);

router.delete('/:id', checkRolYPermisos(['admin'], ['gestionar_categorias']),  eliminarCategoriaValidaciones, validarErrores, categoriaController.eliminarCategoriaController);

router.get('/arbol', checkRolYPermisos(['admin'], ['consultar_categorias']),  categoriaController.obtenerCategoriasArbolController);

router.get('/arbol-con-libros', checkRolYPermisos(['admin'], ['consultar_categorias']), categoriaController.obtenerCategoriasArbolConLibrosController);

router.get('/', categoriaController.obtenerTodasLasCategoriasController);

module.exports = router;