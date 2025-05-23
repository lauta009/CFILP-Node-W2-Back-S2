const categoriaService = require('../services/categoria.service');
const { NotFoundError, BadRequestError } = require('../utils/appErrors');

const categoriaController = {
  async crearCategoriaController(req, res, next) {

    const { nombre, categoria_padre_id } = req.body;
    try {
      const nuevaCategoria = await categoriaService.crearCategoria(nombre, categoria_padre_id);
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      next(error);
    }
  },

  async obtenerCategoriaPorIdController(req, res, next) {

    const { id } = req.params;
    try {
      const categoria = await categoriaService.obtenerCategoriaPorId(id);
      if (!categoria) {
        return next(new NotFoundError(`Categoría con ID ${id} no encontrada.`));
      }
      res.status(200).json(categoria);
    } catch (error) {
      next(error);
    }
  },

  async actualizarCategoriaController(req, res, next) {

    const { id } = req.params;
    const { nombre, categoria_padre_id } = req.body;
    try {
      const categoriaActualizada = await categoriaService.actualizarCategoria(id, nombre, categoria_padre_id);
      res.status(200).json(categoriaActualizada);
    } catch (error) {
      next(error);
    }
  },

  async eliminarCategoriaController(req, res, next) {

    const { id } = req.params;
    try {
      const resultado = await categoriaService.eliminarCategoria(id);
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  },

  async obtenerCategoriasArbolController(req, res, next) {
    try {
      const categoriasArbol = await categoriaService.obtenerCategoriasArbol();
      res.status(200).json(categoriasArbol);
    } catch (error) {
      next(error);
    }
  },

  async obtenerCategoriasArbolConLibrosController(req, res, next) {
    try {
      const categoriasArbolConLibros = await categoriaService.obtenerCategoriasArbolConLibros();
      res.status(200).json(categoriasArbolConLibros);
    } catch (error) {
      next(error);
    }
  },

  async obtenerTodasLasCategoriasController(req, res, next) {
    try {
      const todasLasCategorias = await categoriaService.obtenerTodasLasCategorias();
      res.status(200).json(todasLasCategorias);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoriaController;