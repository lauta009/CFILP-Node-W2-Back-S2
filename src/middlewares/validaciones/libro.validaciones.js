const { body, param, query } = require('express-validator');
const { Autor, Categoria, Editorial } = require('../../models');
const { validarISBNconOpenLibrary } = require('../../utils/externalApis');

const esIdValido = (value) => {
  return Number.isInteger(value) && value > 0;
};

const validarAutor = async (autor) => {
  if (typeof autor === 'number') {
    if (!esIdValido(autor)) {
      throw new Error('El ID de autor debe ser un número entero positivo');
    }
    const existe = await Autor.findByPk(autor);
    if (!existe) {
      throw new Error(`Autor con ID ${autor} no existe`);
    }
  } else if (typeof autor === 'string') {
    if (!esStringNoVacio(autor)) {
      throw new Error('El nombre del autor no puede estar vacío');
    }
  } else {
    throw new Error('Cada autor debe ser un ID numérico o un nombre (string)');
  }
  return true;
};

const crearLibroValidator = [
  body('titulo')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ max: 150 }).withMessage('El título no puede tener más de 150 caracteres')
    .isString().withMessage('El título debe ser una cadena de texto'),
  
  body('saga_coleccion')
    .optional()
    .isString().withMessage('La saga o colección debe ser una cadena de texto')
    .trim()
    .isLength({ max: 100 }).withMessage('La saga o colección no puede tener más de 100 caracteres'),
  
  body('editorial_id')
    .optional({ checkFalsy: true })
    .custom(async (value) => {
      if (value && !esIdValido(value)) {
        throw new Error('El ID de editorial debe ser un número entero positivo');
      }
      if (value) {
        const editorial = await Editorial.findByPk(value);
        if (!editorial) {
          throw new Error(`Editorial con ID ${value} no existe`);
        }
      }
      return true;
    }),

  body('editorial')
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ max: 255 }),

  
  body('categoria_id')
    .optional({ checkFalsy: true })
    .custom(async (value) => {
      if (value && !esIdValido(value)) {
        throw new Error('El ID de categoría debe ser un número entero positivo');
      }
      if (value) {
        const categoria = await Categoria.findByPk(value);
        if (!categoria) {
          throw new Error(`Categoría con ID ${value} no existe`);
        }
      }
      return true;
    }),

  body('categoria')
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ max: 255 }),

  body('fecha_publicacion')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('Formato inválido (YYYY-MM-DD)'),

  body('isbn')
    .optional({ checkFalsy: true })
    .isLength({ max: 17 })
    .bail()
    .custom(async (value) => {
      if (value) {
        try {
          await validarISBNconOpenLibrary(value);
        } catch (error) {
          throw new Error(error.message);
        }
      }
      return true;
    }),

  body('resumen')
    .optional()
    .isString(),

  body('portada_url')
    .optional()
    .isURL(),

  body('idioma')
    .optional()
    .isLength({ max: 50 }),

  body('nro_paginas')
    .optional()
    .isInt({ min: 1 }),

  body('es_premium')
    .optional()
    .isBoolean().withMessage('Debe ser true o false')
    .optional({ checkFalsy: true }), // Para que undefined no falle la validación

  body('autores')
    .optional()
    .isArray()
    .custom(async (autoresInput) => {
      if (autoresInput) {
        await Promise.all(autoresInput.map(validarAutor));
      }
      return true;
    }),
];

const listarLibrosValidator = [
  query('limit')
    .optional()
    .isInt({ min: 1 }).withMessage('El límite debe ser un número entero positivo'),

  query('offset')
    .optional()
    .isInt({ min: 0 }).withMessage('El offset debe ser un número entero no negativo'),

  query('page')
    .optional()
    .isInt({ min: 1 }).withMessage('La página debe ser un número entero positivo'),

  query('categoria')
    .optional()
    .isString().withMessage('La categoría debe ser una cadena de texto'),

  query('editorial')
    .optional()
    .isString().withMessage('La editorial debe ser una cadena de texto'),

  query('autor')
    .optional()
    .isString().withMessage('El autor debe ser una cadena de texto'),

  query('detalle')
    .optional()
    .isIn(['completo', 'basico']).withMessage('El detalle debe ser "completo" o "basico"'),
];

const idLibroValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('ID del libro inválido')
];

const buscarLibrosValidaciones = [
  query('titulo')
    .optional()
    .isString().withMessage('El título debe ser una cadena de texto')
    .trim(),
  query('saga')
    .optional()
    .isString().withMessage('La saga debe ser una cadena de texto')
    .trim(),
  // Validación personalizada para asegurar que al menos uno de los dos esté presente
  (req, res, next) => {
    if (!req.query.titulo && !req.query.saga) {
      return res.status(400).json({ errors: [{ msg: 'Debe proporcionar al menos un título o una saga para la búsqueda', param: 'query' }] });
    }
    next();
  },
];

const estadoValidator = [
  param('estado')
    .optional()
    .isString().withMessage('El estado debe ser una cadena de texto')
    .isIn(['disponible', 'prestado', 'reparacion', 'baja'])
    .withMessage('El estado debe ser uno de: disponible, prestado, reparacion, baja'),  
];

module.exports = {
  crearLibroValidator,
  idLibroValidator,
  buscarLibrosValidaciones,
  listarLibrosValidator,
  estadoValidator,
};