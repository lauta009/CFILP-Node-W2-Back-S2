const libroService = require('../services/libro.service');

const libroController = {

  async crear(req, res) {
    try {
      const nuevoLibro = await libroService.crearLibro(req.body);
      res.status(201).json(nuevoLibro);
    } catch (error) {
      console.error('Error al crear el libro:', error);
      res.status(400).json({
        error: 'Error al crear el libro',
        detalles: error.message
      });
    }
  },

  async listar(req, res) {
    try {
      const { categoria, editorial, autor, page, limit, detalle } = req.query;
      const params = {
        categoria: categoria ?? null,
        editorial: editorial ?? null,
        autor: autor ?? null,
        page: page ?? 1,
        limit: limit ?? 10,
        detalle: detalle ?? 'completo', 
      };
      const resultado = await libroService.listarLibros(params);
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      res.status(500).json({ error: 'Error al obtener los libros' });
    }
  },


  async obtenerPorId(req, res) {
    try {
      const libro = await libroService.obtenerLibroPorId(req.params.id);
      if (!libro) {
        return res.status(404).json({ error: 'Libro no encontrado' });
      }
      res.status(200).json(libro);
    } catch (error) {
      console.error('Error al obtener el libro:', error);
      res.status(500).json({ error: 'Error al obtener el libro' });
    }
  },


  async actualizar(req, res) {
    try {
      const libroActualizado = await libroService.actualizarLibro(req.params.id, req.body);
      res.status(200).json(libroActualizado);
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
      res.status(400).json({ error: 'Error al actualizar el libro', detalles: error.message });
    }
  },


  async eliminar(req, res) {
    try {
      await libroService.eliminarLibro(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
      res.status(500).json({ error: 'Error al eliminar el libro', detalles: error.message });
    }
  },

  //Metodos de  consultas con relación a ejemplares y alquileres
  async obtenerMetricasLibros(req, res) {
    try {
      const metricas = await libroService.obtenerMetricasLibros();
      res.status(200).json(metricas);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las métricas de libros', detalles: error.message });
    }
  },

  async obtenerLibrosConEjemplares(req, res) {
    try {
      const librosConEjemplares = await libroService.obtenerLibrosConEjemplares();
      res.status(200).json(librosConEjemplares);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener libros con sus ejemplares', detalles: error.message });
    }
  },

  async obtenerLibrosConEjemplaresPorEstado(req, res) {
    const estado = req.params.estado ?? 'disponible'; 
    try {
      const librosPorEstado = await libroService.obtenerLibrosConEjemplaresPorEstado(estado);
      res.status(200).json(librosPorEstado);
    } catch (error) {
      res.status(500).json({ error: `Error al obtener libros con ejemplares ${estado}`, detalles: error.message });
    }
  },

  async obtenerLibrosMasAlquiladosHistorico(req, res) {
    try {
      const librosMasAlquilados = await libroService.obtenerLibrosMasAlquiladosHistorico();
      res.status(200).json(librosMasAlquilados);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los libros más alquilados históricamente', detalles: error.message });
    }
  },
};

module.exports = libroController;
