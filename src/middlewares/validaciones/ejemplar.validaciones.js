const { body, param, query } = require('express-validator');
const { Libro } = require('../../models');

const existeLibroPorId = async (id) => {
  if (!Number.isInteger(parseInt(id)) || parseInt(id) <= 0) {
    throw new Error('El ID del libro debe ser un número entero positivo');
  }
  const libro = await Libro.findByPk(id);
  if (!libro) {
    throw new Error(`El libro con ID ${id} no existe`);
  }
  return true;
};

const esEstadoValido = (estado) => {
  return ['disponible', 'prestado', 'reparacion', 'baja'].includes(estado);
};

const crearEjemplarValidator = [
  body('libro_id')
    .notEmpty().withMessage('El ID del libro es obligatorio')
    .isInt({ min: 1 }).withMessage('El ID del libro debe ser un número entero positivo')
    .custom(existeLibroPorId),

  body('codigo_barra')
    .notEmpty().withMessage('El código de barra es obligatorio')
    .isString().withMessage('El código de barra debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('El código de barra no puede tener más de 100 caracteres'),

  body('estado')
    .notEmpty().withMessage('El estado es obligatorio')
    .isString().withMessage('El estado debe ser una cadena de texto')
    .custom(esEstadoValido).withMessage('El estado debe ser uno de: disponible, prestado, reparacion, baja'),
];

//Se permite actualizar un ejemplar por su ID o por su código de barra.
const actualizarEjemplarValidator = [
  
  param('id')
    .optional()
    .isInt({ min: 1 }).withMessage('El ID del ejemplar debe ser un número entero positivo'),

  param('codigo_barra')
    .optional()
    .isString().withMessage('El código de barra debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('El código de barra no puede tener más de 100 caracteres'),

  param(['id', 'codigo_barra'])
    .custom((value, { req }) => {
      if (!req.params.id && !req.params.codigo_barra) {
        throw new Error('Se debe proporcionar el ID o el código de barra del ejemplar a modificar');
      }
      return true;
    }),

  body('libro_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El ID del libro debe ser un número entero positivo')
    .custom(existeLibroPorId),

  body('estado')
    .optional()
    .isString().withMessage('El estado debe ser una cadena de texto')
    .custom(esEstadoValido).withMessage('El estado debe ser uno de: disponible, prestado, reparacion, baja'),
];

const obtenerEjemplarPorIdValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('El ID del ejemplar debe ser un número entero positivo'),
];

const obtenerEjemplarPorCodigoBarraValidator = [
  param('codigo_barra')
    .notEmpty().withMessage('El código de barra es obligatorio')
    .isString().withMessage('El código de barra debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('El código de barra no puede tener más de 100 caracteres'),
];

const obtenerTodosLosEjemplaresValidator = [
  query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('El límite debe ser un número entero positivo'),

  query('offset')
    .optional()
    .isInt({ min: 0 }).withMessage('El offset debe ser un número entero no negativo'),

  query('libro_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El ID del libro debe ser un número entero positivo')
    .custom(existeLibroPorId),

  query('codigo_barra')
    .optional()
    .isString().withMessage('El código de barra debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('El código de barra no puede tener más de 100 caracteres'),

  query('estado')
    .optional()
    .isString().withMessage('El estado debe ser una cadena de texto')
    .custom(esEstadoValido).withMessage('El estado debe ser uno de: disponible, prestado, reparacion, baja'),
];

module.exports = {
  crearEjemplarValidator,
  actualizarEjemplarValidator,
  obtenerEjemplarPorIdValidator,
  obtenerEjemplarPorCodigoBarraValidator,
  obtenerTodosLosEjemplaresValidator,
};