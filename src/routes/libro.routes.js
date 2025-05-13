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

/**
 * @swagger
 * /libros:
 * get:
 * summary: Obtiene una lista de libros con opciones de filtrado y paginación.
 * description: Retorna una lista paginada de libros. Permite filtrar por categoría, editorial y autor, y especificar el nivel de detalle de la información.
 * parameters:
 * - in: query
 * name: categoria
 * schema:
 * type: string
 * description: Filtrar libros por nombre de categoría (insensible a mayúsculas).
 * - in: query
 * name: editorial
 * schema:
 * type: string
 * description: Filtrar libros por nombre de editorial (insensible a mayúsculas).
 * - in: query
 * name: autor
 * schema:
 * type: string
 * description: Filtrar libros por nombre de autor (insensible a mayúsculas).
 * - in: query
 * name: page
 * schema:
 * type: integer
 * default: 1
 * minimum: 1
 * description: Número de página para la paginación.
 * - in: query
 * name: limit
 * schema:
 * type: integer
 * default: 10
 * minimum: 1
 * maximum: 100
 * description: Cantidad de libros por página.
 * - in: query
 * name: detalle
 * schema:
 * type: string
 * enum: [basico, completo]
 * default: completo
 * description: Nivel de detalle de la información del libro. 'basico' incluye título, ISBN, categoría y ejemplares. 'completo' incluye toda la información.
 * responses:
 * '200':
 * description: Lista paginada de libros obtenida exitosamente.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * total:
 * type: integer
 * description: Total de libros encontrados.
 * totalPages:
 * type: integer
 * description: Número total de páginas.
 * currentPage:
 * type: integer
 * description: Número de la página actual.
 * libros:
 * type: array
 * items:
 * type: object
 * properties:
 * id:
 * type: integer
 * description: ID único del libro.
 * titulo:
 * type: string
 * description: Título del libro.
 * isbn:
 * type: string
 * description: ISBN del libro.
 * categoria:
 * type: string
 * nullable: true
 * description: Nombre de la categoría del libro.
 * ejemplares:
 * type: array
 * items:
 * type: string
 * description: Códigos de barra de los ejemplares (solo en detalle 'basico' y 'completo').
 * fecha_publicacion:
 * type: string
 * format: date
 * nullable: true
 * description: Fecha de publicación del libro (solo en detalle 'completo').
 * portada_url:
 * type: string
 * nullable: true
 * description: URL de la portada del libro (solo en detalle 'completo').
 * resumen:
 * type: string
 * nullable: true
 * description: Resumen del libro (solo en detalle 'completo').
 * idioma:
 * type: string
 * nullable: true
 * description: Idioma del libro (solo en detalle 'completo').
 * nro_paginas:
 * type: integer
 * nullable: true
 * description: Número de páginas del libro (solo en detalle 'completo').
 * es_premium:
 * type: boolean
 * description: Indica si el libro es premium (solo en detalle 'completo').
 * editorial:
 * type: string
 * nullable: true
 * description: Nombre de la editorial del libro (solo en detalle 'completo').
 * autores:
 * type: array
 * items:
 * type: string
 * description: Lista de nombres de los autores del libro (solo en detalle 'completo').
 * '500':
 * description: Error interno del servidor al obtener los libros.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * error:
 * type: string
 * description: Mensaje de error.
 */
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