const express = require('express');
const router = express.Router();

const libroController = require('../controllers/libro.controller');
const { crearLibroValidator, idLibroValidator } = require('../middlewares/validaciones/libro.validaciones');
const validarErrores = require('../middlewares/validarErrores');


router.get('/', libroController.listar);

router.get('/:id',
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

module.exports = router;
