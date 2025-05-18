const alquilerService = require('../services/alquiler.service');

const alquilerController = {
  async crearAlquilerRegular(req, res) {
    const { ejemplar_id } = req.body;
    const usuarioId = req.usuario.id; // Obtener el ID del usuario del token
    try {
      const alquiler = await alquilerService.alquilarLibroRegular(usuarioId, ejemplar_id);
      res.status(201).json(alquiler);
    } catch (error) {
      res.status(400).json({ error: 'Error al alquilar el libro', detalles: error.message });
    }
  },

  async crearAlquilerPremium(req, res) {
    const { ejemplar_id } = req.body;
    const usuarioId = req.usuario.id; // Obtener el ID del usuario del token
    try {
      const alquiler = await alquilerService.alquilarLibroPremium(usuarioId, ejemplar_id);
      res.status(201).json(alquiler);
    } catch (error) {
      res.status(400).json({ error: 'Error al alquilar el libro premium', detalles: error.message });
    }
  },

  async devolverEjemplar(req, res) {
    const { usuario_id, ejemplar_id } = req.body;
    try {
      const resultadoDevolucion = await alquilerService.devolverEjemplar(usuario_id, ejemplar_id);
      res.status(200).json(resultadoDevolucion);
    } catch (error) {
      res.status(400).json({ error: 'Error al devolver el ejemplar', detalles: error.message });
    }
  },

  async obtenerTodosLosAlquileres(req, res) {
    try {
      const alquileres = await alquilerService.obtenerTodosLosAlquileres();
      res.status(200).json(alquileres);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener todos los alquileres', detalles: error.message });
    }
  },

  async obtenerAlquilerPorId(req, res) {
    const id = parseInt(req.params.id);
    try {
      const alquiler = await alquilerService.obtenerAlquilerPorId(id);
      if (alquiler) {
        res.status(200).json(alquiler);
      } else {
        res.status(404).json({ mensaje: `Alquiler con ID ${id} no encontrado` });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el alquiler', detalles: error.message });
    }
  },

  async obtenerAlquileresActivos(req, res) {
    try {
      const alquileresActivos = await alquilerService.obtenerAlquileresActivos();
      res.status(200).json(alquileresActivos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los alquileres activos', detalles: error.message });
    }
  },

  async obtenerAlquileresActivosVencidos(req, res) {
    try {
      const alquileresVencidos = await alquilerService.obtenerAlquileresActivosVencidos();
      res.status(200).json(alquileresVencidos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los alquileres activos vencidos', detalles: error.message });
    }
  }
};

module.exports = alquilerController;