const express = require('express');
const router = express.Router();

const {
  crear,
  listar,
  obtenerPorId,
  actualizar,
  eliminar
} = require('../Controllers/libro.controller');

const { crearLibroValidator, idLibroValidator } = require('../middlewares/validaciones/libro.validaciones');
const validarErrores = require('../middlewares/validaciones/validarErrores');


router.get('/', listar);

router.get('/:id',
  idLibroValidator,
  validarErrores,
  obtenerPorId
);

router.post(
  '/',
  crearLibroValidator,
  validarErrores,
  crear
);

router.put('/:id',
  idLibroValidator,
  crearLibroValidator,
  validarErrores,
  actualizar
);

router.delete('/:id',
  idLibroValidator,
  validarErrores,
  eliminar
);

module.exports = router;