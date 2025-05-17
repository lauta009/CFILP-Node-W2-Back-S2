const { body, param } = require('express-validator');

const crearCategoriaValidaciones = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre de la categoría es requerido'),
  body('categoria_padre_id')
    .optional()
    .isInt()
    .withMessage('El ID de la categoría padre debe ser un entero'),
];

const obtenerCategoriaPorIdValidaciones = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID de la categoría debe ser un entero mayor o igual a 1'),
];

const actualizarCategoriaValidaciones = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID de la categoría debe ser un entero mayor o igual a 1'),
  body('nombre')
    .optional()
    .notEmpty()
    .withMessage('El nombre de la categoría no puede estar vacío'),
  body('categoria_padre_id')
    .optional()
    .isInt()
    .withMessage('El ID de la categoría padre debe ser un entero'),
];

const eliminarCategoriaValidaciones = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID de la categoría debe ser un entero mayor o igual a 1'),
];

module.exports = {
  crearCategoriaValidaciones,
  obtenerCategoriaPorIdValidaciones,
  actualizarCategoriaValidaciones,
  eliminarCategoriaValidaciones,
};