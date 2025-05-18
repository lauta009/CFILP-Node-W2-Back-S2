const categoriaService = require('../services/categoria.service');

const categoriaController = {
  async crearCategoriaController(req, res) {
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { nombre, categoria_padre_id } = req.body;
    try {
      const nuevaCategoria = await categoriaService.crearCategoria(nombre, categoria_padre_id);
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      console.error('Error al crear categoría:', error);
      res.status(500).json({ error: 'No se pudo crear la categoría' });
    }
  },

  async obtenerCategoriaPorIdController(req, res) {

    const { id } = req.params;
    try {
      const categoria = await categoriaService.obtenerCategoriaPorId(id);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
      res.status(200).json(categoria);
    } catch (error) {
      console.error('Error al obtener categoría:', error);
      res.status(500).json({ error: 'No se pudo obtener la categoría' });
    }
  },

  async actualizarCategoriaController(req, res) {

    const { id } = req.params;
    const { nombre, categoria_padre_id } = req.body;
    try {
      const categoriaActualizada = await categoriaService.actualizarCategoria(id, nombre, categoria_padre_id);
      res.status(200).json(categoriaActualizada);
    } catch (error) {
      console.error('Error al actualizar categoría:', error);
      res.status(404).json({ error: error.message });
    }
  },

  async eliminarCategoriaController(req, res) {

    const { id } = req.params;
    try {
      const resultado = await categoriaService.eliminarCategoria(id);
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error al eliminar categoría:', error);
      res.status(404).json({ error: error.message });
    }
  },

  async obtenerCategoriasArbolController(req, res) {
    try {
      const categoriasArbol = await categoriaService.obtenerCategoriasArbol();
      res.status(200).json(categoriasArbol);
    } catch (error) {
      console.error('Error al obtener categorías en árbol:', error);
      res.status(500).json({ error: 'No se pudieron obtener las categorías' });
    }
  },

  async obtenerCategoriasArbolConLibrosController(req, res) {
    try {
      const categoriasArbolConLibros = await categoriaService.obtenerCategoriasArbolConLibros();
      res.status(200).json(categoriasArbolConLibros);
    } catch (error) {
      console.error('Error al obtener categorías en árbol con libros:', error);
      res.status(500).json({ error: 'No se pudieron obtener las categorías con libros' });
    }
  },

  async obtenerTodasLasCategoriasController(req, res) {
    try {
      const todasLasCategorias = await categoriaService.obtenerTodasLasCategorias();
      res.status(200).json(todasLasCategorias);
    } catch (error) {
      console.error('Error al obtener todas las categorías:', error);
      res.status(500).json({ error: 'No se pudieron obtener las categorías' });
    }
  },
};

module.exports = categoriaController;