const { body, param } = require('express-validator');
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
    .isLength({ max: 150 }),

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

const idLibroValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('ID del libro inválido')
];

module.exports = {
  crearLibroValidator,
  idLibroValidator
};