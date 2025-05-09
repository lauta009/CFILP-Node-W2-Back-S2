const { Libro } = require('../models');
const { Categoria } = require('../models');
const { Autor } = require('../models');

const libroController = {
  async crear(req, res) {
    try {

      const nuevoLibro = await Libro.create(req.body);
      res.status(201).json(nuevoLibro);
      
    } catch (error) {
      res.status(400).json({ error: 'Error al crear el libro', detalles: error.message });
    }
  },

  async listar(req, res) {
    try {

      const libros = await Libro.findAll({
        include: [Categoria, Autor]
      });
      res.status(200).json(libros);

    } catch (error) {
      console.error('Error al obtener los libros:', error);
      res.status(500).json({ error: 'Error al obtener los libros', detalles: error.message });
    }
  },

  async obtenerPorId(req, res) {
    try {

      const libro = await Libro.findByPk(req.params.id, {
        include: [Categoria, Autor]
      });
      if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
      res.status(200).json(libro);

    } catch (error) {
      console.error('Error al obtener el libro:', error);
      res.status(500).json({ error: 'Error al obtener el libro', detalles: error.message });
    }
  },

  async actualizar(req, res) {
    try {

      const libro = await Libro.findByPk(req.params.id);
      if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
      await libro.update(req.body);
      res.status(200).json(libro);

    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar el libro', detalles: error.message });
    }
  },

  async eliminar(req, res) {
    try {

      const libro = await Libro.findByPk(req.params.id);
      if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
      await libro.destroy();
      res.status(204).send();

    } catch (error) {
      console.error('Error al eliminar el libro:', error);
      res.status(500).json({ error: 'Error al eliminar el libro', detalles: error.message });
    }
  }
};

module.exports = libroController;
