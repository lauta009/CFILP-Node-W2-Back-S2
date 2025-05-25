const { body, param } = require('express-validator');

const crearCategoriaValidaciones = [
  body('nombre')
    .notEmpty()
    .trim()
    .isLength({ max: 150 }).withMessage('La categoría o subcategría no puede tener más de 150 caracteres')
    .withMessage('El nombre de la categoría es requerido')
    .escape(),
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
    .trim()
    .isLength({ max: 150 }).withMessage('La categoría o subcategría no puede tener más de 150 caracteres')
    .withMessage('El nombre de la categoría es requerido')
    .escape(),
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