const ejemplaresService = require('../services/ejemplar.service');
const { NotFoundError } = require('../utils/appErrors');

const ejemplaresController = {
  async crear(req, res, next) {
    try {
      const nuevoEjemplar = await ejemplaresService.crearEjemplar(req.body);
      res.status(201).json(nuevoEjemplar);
    } catch (error) {
      next(error);
    }
  },

  async obtenerUno(req, res, next) {
    try {
      const ejemplar = await ejemplaresService.obtenerEjemplarPorId(req.params.id);
      if (!ejemplar) {
        return next(new NotFoundError('Ejemplar no encontrado.'));
      } else {
        res.status(200).json(ejemplar);
      }
    } catch (error) {
      next(error);
    }
  },

  async obtenerPorCodigoBarra(req, res, next) {
    try {
      const codigoBarra = req.params.codigo_barra;
      const ejemplar = await ejemplaresService.obtenerEjemplarPorCodigoBarra(codigoBarra);
      if (ejemplar) {
        res.status(200).json(ejemplar);
      } else {
        return next(new NotFoundError('`Ejemplar con código de barra ${codigoBarra} no encontrado` .'));
      }
    } catch (error) {
      next(error);
    }
  },

  async obtenerEjemplaresDisponiblesDeLibro (req, res, next) {
    try {
      const { id, titulo } = req.query; 

      let identificadorParaServicio;

      if (id) {
        identificadorParaServicio = parseInt(id, 10);
        if (isNaN(identificadorParaServicio)) {
          return next(new BadRequestError('El ID proporcionado no es un número válido.'));
        }
      } else if (titulo) {
        identificadorParaServicio = titulo;
      } else {
        return next(new BadRequestError('Se requiere un ID o un título de libro en los parámetros de consulta (query).'));
      }

      // Llama al servicio con el identificador consolidado
      const resultado = await ejemplaresService.obtenerEjemplaresDisponiblesDeUnLibro(identificadorParaServicio);

      if (resultado.totalDisponibles === 0) {
        return res.status(200).json({
          status: 'success',
          message: `El libro "${resultado.libro.titulo}" no tiene ejemplares disponibles actualmente.`,
          data: resultado
        });
      }

      res.status(200).json({
        status: 'success',
        data: resultado
      });
    } catch (error) {
      next(error);
    }
  },

  async obtenerTodos(req, res, next) {
    try {
      const ejemplares = await ejemplaresService.obtenerTodosLosEjemplares(req.query);
      res.status(200).json(ejemplares);
    } catch (error) {
      next(error);
    }
  },

  async actualizar(req, res, next) {
    try {
      const ejemplarActualizado = await ejemplaresService.actualizarEjemplar(req.params.id, req.body);
      if (ejemplarActualizado) {
        res.status(200).json(ejemplarActualizado);
      } else {
        return next(new NotFoundError({ mensaje: 'Ejemplar no encontrado para actualizar' }));
      }
    } catch (error) {
      next(error);
    }
  },

  async eliminar(req, res, next) {
    try {
      const resultado = await ejemplaresService.eliminarEjemplar(req.params.id);
      if (resultado) {
        res.status(204).send();
      } else {
        return next(new NotFoundError({ mensaje: 'Ejemplar no encontrado para eliminar' }));
      }
    } catch (error) {
      next(error);
    }
  }
};

module.exports = ejemplaresController ;