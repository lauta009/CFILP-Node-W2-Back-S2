const alquilerService = require('../services/alquiler.service');
const { NotFoundError } = require('../utils/appErrors');

const alquilerController = {
  async crearAlquilerRegular(req, res, next) {
    const { ejemplar_id } = req.body;
    const usuarioId = req.usuario.id; // Obtiene el ID del usuario del token
    if (!usuarioId) {
      console.log('No se encontró el ID del usuario en el token');
      return next(new NotFoundError('Usuario  con no encontrado'));
    }
    try {
      const alquiler = await alquilerService.alquilarLibroRegular(usuarioId, ejemplar_id);

      res.status(201).json(alquiler);
    } catch (error) {
      console.log('Error al crear el alquiler regular:', error);
      next(error);
    }
  },

  async crearAlquilerPremium(req, res, next) {
    const { ejemplar_id } = req.body;
    const usuarioId = req.usuario.id; // Obtiene el ID del usuario del token
    if (!usuarioId) {
      console.log('No se encontró el ID del usuario en el token');
      return next(new NotFoundError('Usuario  con no encontrado'));
    }
    try {
      const alquiler = await alquilerService.alquilarLibroPremium(usuarioId, ejemplar_id);
      res.status(201).json(alquiler);
    } catch (error) {
      next(error);
    }
  },

  async devolverEjemplar(req, res, next) {
    const { ejemplar_id } = req.body;
    const usuarioId = req.usuario.id; // Obtiene el ID del usuario del token
    if (!usuarioId) {
      console.log('No se encontró el ID del usuario en el token');
      return next(new NotFoundError('Usuario  con no encontrado'));
    }
    try {
      const resultadoDevolucion = await alquilerService.devolverEjemplar(usuarioId, ejemplar_id);
      res.status(200).json(resultadoDevolucion);
    } catch (error) {
      next(error);
    }
  },

  async obtenerTodosLosAlquileres(req, res, next) {
    try {
      const alquileres = await alquilerService.obtenerTodosLosAlquileres();
      res.status(200).json(alquileres);
    } catch (error) {
      next(error);
    }
  },

  async obtenerAlquilerPorId(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      const alquiler = await alquilerService.obtenerAlquilerPorId(id);
      if (alquiler) {
        res.status(200).json(alquiler);
      } else {
        return next(new NotFoundError('Alquiler no encontrado'));
      }
    } catch (error) {
      next(error);
    }
  },

  async obtenerAlquileresActivos(req, res, next) {
    try {
      const alquileresActivos = await alquilerService.obtenerAlquileresActivos();
      res.status(200).json(alquileresActivos);
    } catch (error) {
      next(error);
    }
  },

  async obtenerAlquileresActivosVencidos(req, res, next) {
    try {
      const alquileresVencidos = await alquilerService.obtenerAlquileresActivosVencidos();
      res.status(200).json(alquileresVencidos);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = alquilerController;