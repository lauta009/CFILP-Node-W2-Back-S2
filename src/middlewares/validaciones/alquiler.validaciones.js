const { body, param } = require('express-validator');

const crearAlquilerValidator = [
  body('ejemplar_id')
    .notEmpty().withMessage('El ID del ejemplar es obligatorio')
    .isInt({ min: 1 }).withMessage('El ID del ejemplar debe ser un entero positivo'),
];

const devolverAlquilerValidator = [
  body('ejemplar_id')
    .notEmpty().withMessage('El ID del ejemplar es obligatorio')
    .isInt({ min: 1 }).withMessage('El ID del ejemplar debe ser un entero positivo'),
];

const obtenerAlquilerPorIdValidator = [
  param('id')
    .notEmpty().withMessage('El ID del alquiler es obligatorio')
    .isInt({ min: 1 }).withMessage('El ID del alquiler debe ser un entero positivo'),
];

module.exports = {
  crearAlquilerValidator,
  devolverAlquilerValidator,
  obtenerAlquilerPorIdValidator,
};