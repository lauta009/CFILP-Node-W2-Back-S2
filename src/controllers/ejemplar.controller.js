const ejemplaresService = require('../services/ejemplar.service');

const ejemplaresController = {
  async crear(req, res) {
    try {
      const nuevoEjemplar = await ejemplaresService.crearEjemplar(req.body);
      res.status(201).json(nuevoEjemplar);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear ejemplar', detalles: error.message });
    }
  },

  async obtenerUno(req, res) {
    try {
      const ejemplar = await ejemplaresService.obtenerEjemplarPorId(req.params.id);
      if (ejemplar) {
        res.status(200).json(ejemplar);
      } else {
        res.status(404).json({ mensaje: 'Ejemplar no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener ejemplar', detalles: error.message });
    }
  },

  async obtenerPorCodigoBarra(req, res) {
    try {
      const codigoBarra = req.params.codigo_barra;
      const ejemplar = await ejemplaresService.obtenerEjemplarPorCodigoBarra(codigoBarra);
      if (ejemplar) {
        res.status(200).json(ejemplar);
      } else {
        res.status(404).json({ mensaje: `Ejemplar con código de barra ${codigoBarra} no encontrado` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener ejemplar por código de barra', detalles: error.message });
    }
  },

  async obtenerTodos(req, res) {
    try {
      const ejemplares = await ejemplaresService.obtenerTodosLosEjemplares(req.query);
      res.status(200).json(ejemplares);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener ejemplares', detalles: error.message });
    }
  },

  async actualizar(req, res) {
    try {
      const ejemplarActualizado = await ejemplaresService.actualizarEjemplar(req.params.id, req.body);
      if (ejemplarActualizado) {
        res.status(200).json(ejemplarActualizado);
      } else {
        res.status(404).json({ mensaje: 'Ejemplar no encontrado para actualizar' });
      }
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar ejemplar', detalles: error.message });
    }
  },

  async eliminar(req, res) {
    try {
      const resultado = await ejemplaresService.eliminarEjemplar(req.params.id);
      if (resultado) {
        res.status(204).send();
      } else {
        res.status(404).json({ mensaje: 'Ejemplar no encontrado para eliminar' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar ejemplar', detalles: error.message });
    }
  }
};

module.exports = ejemplaresController ;