const ejemplaresService = require('../services/ejemplar.service');

async function crear(req, res) {
  try {
    const nuevoEjemplar = await ejemplaresService.crearEjemplar(req.body);
    res.status(201).json(nuevoEjemplar);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear ejemplar', detalles: error.message });
  }
}

async function obtenerUno(req, res) {
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
}

async function obtenerTodos(req, res) {
  try {
    const ejemplares = await ejemplaresService.obtenerTodosLosEjemplares(req.query);
    res.status(200).json(ejemplares);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener ejemplares', detalles: error.message });
  }
}

async function actualizar(req, res) {
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
}

async function eliminar(req, res) {
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

module.exports = {
  crear,
  obtenerUno,
  obtenerTodos,
  actualizar,
  eliminar,
};