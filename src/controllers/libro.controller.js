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
        editorial: editorial ?? undefined,
        autor: autor ?? undefined,
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

  //Metodos de  consultas con relación a ejemplares
  async obtenerLibrosConEjemplares(req, res) {
    try {
      const librosConEjemplares = await libroService.obtenerLibrosConEjemplares();
      res.status(200).json(librosConEjemplares);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener libros con sus ejemplares', detalles: error.message });
    }
  },

  async obtenerLibrosConEjemplaresDisponibles(req, res) {
    try {
      const librosDisponibles = await libroService.obtenerLibrosConEjemplaresPorEstado('disponible');
      res.status(200).json(librosDisponibles);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener libros con ejemplares disponibles', detalles: error.message });
    }
  },

  async obtenerLibrosConEjemplaresPrestados(req, res) {
    try {
      const librosPrestados = await libroService.obtenerLibrosConEjemplaresPorEstado('prestado');
      res.status(200).json(librosPrestados);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener libros con ejemplares prestados', detalles: error.message });
    }
  },

  async obtenerLibrosConEjemplaresEnReparacion(req, res) {
    try {
      const librosEnReparacion = await libroService.obtenerLibrosConEjemplaresPorEstado('reparacion');
      res.status(200).json(librosEnReparacion);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener libros con ejemplares en reparación', detalles: error.message });
    }
  },

  async obtenerLibrosConEjemplaresBaja(req, res) {
    try {
      const librosBaja = await libroService.obtenerLibrosConEjemplaresPorEstado('baja');
      res.status(200).json(librosBaja);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener libros con ejemplares en baja', detalles: error.message });
    }
  }
};

module.exports = libroController;
