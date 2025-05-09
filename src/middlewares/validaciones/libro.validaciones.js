const { body, param } = require('express-validator');
const { Autor, Categoria, Editorial } = require('../../models');
const { validarISBNconOpenLibrary } = require('../../utils/externalApis');

const existeEntidadPorId = (modelo, nombre) => {
  return async (id) => {
    const encontrado = await modelo.findByPk(id);
    if (!encontrado) {
      throw new Error(`${nombre} con ID ${id} no existe`);
    }
    return true;
  };
};

const crearLibroValidator = [
  body('titulo')
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ max: 150 }),

  body('editorial_id')
    .isInt({ min: 1 }).withMessage('Debe ser un ID numérico')
    .bail()
    .custom(existeEntidadPorId(Editorial, 'Editorial')),

  body('categoria_id')
    .isInt({ min: 1 }).withMessage('Debe ser un ID numérico')
    .bail()
    .custom(existeEntidadPorId(Categoria, 'Categoría')),

  body('fecha_publicacion')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('Formato inválido (YYYY-MM-DD)'),

  body('isbn')
    .optional({ checkFalsy: true })
    .isLength({ max: 17 })
    .bail()
    .custom(validarISBNconOpenLibrary),

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
    .isBoolean().withMessage('Debe ser true o false'),

  body('autores')
    .isArray({ min: 1 }).withMessage('Debe ser un array de IDs de autores')
    .custom(async (autoresIds) => {
      await Promise.all(
        autoresIds.map(id => existeEntidadPorId(Autor, 'Autor')(id))
      );
      return true;
    }),
];

const idLibroValidator = [
  param('id')
    .isInt({ min: 1 }).withMessage('ID inválido')
];

module.exports = {
  crearLibroValidator,
  idLibroValidator
};
