const libroService = require('../services/libro.service');
const { NotFoundError } = require('../utils/appErrors');

const libroController = {
  
  async crear(req, res, next) {
    try {
      const nuevoLibro = await libroService.crearLibro(req.body);
      res.status(201).json(nuevoLibro);
    } catch (error) {
      next(error);
    }
  },
  
  // Método para listar libros con filtros y paginación
  // Se pueden filtrar por categoría, editorial y autor
  async listar(req, res, next) {
    try {
      const { categoria, editorial, autor, page, limit, detalle } = req.query;
      let limite = parseInt(limit) || 10; // Por defecto trae los 10 primeros libros de la bbdd

      // Límite máximo permitido
      if (limite > 100) limite = 100; // Evita sobrecarga del servidor 

      const params = {
        categoria: categoria ?? null,
        editorial: editorial ?? null,
        autor: autor ?? null,
        page: page ?? 1,
        limit: limite ?? 100000,
        detalle: detalle ?? 'completo', 
      };
      const resultado = await libroService.listarLibros(params);
      console.log('📚 Datos crudos de libros:\n', JSON.stringify(resultado.libros, null, 2));
      res.status(200).json(resultado);
    } catch (error) {
      next(error);
    }
  },

  async obtenerPorId(req, res, next) {
    try {
      const libro = await libroService.obtenerLibroPorId(req.params.id);
      if (!libro) {
        return next(new NotFoundError('Libro no encontrado.'));
      }
      res.status(200).json(libro);
    } catch (error) {
      next(error);
    }
  },
  	
  // Método para buscar libros por título o saga	
  async buscarLibrosController(req, res, next) {
    try {
      const { titulo, saga } = req.query;
      const resultados = await libroService.buscarLibrosPorCondicion({ titulo, saga });
      res.status(200).json(resultados);
      if (resultados.length === 0) {
        return next(new NotFoundError('No se encontraron libros con esos criterios.'));
      }
    } catch (error) {
      next(error);
    }
  },

  async actualizar(req, res, next) {
    try {
      const libroActualizado = await libroService.actualizarLibro(req.params.id, req.body);
      res.status(200).json(libroActualizado);

      if (!libroActualizado) {
        return next(new NotFoundError('Libro no encontrado para actualizar.'));
      }
    } catch (error) {
      next(error);
    }
  },

  async eliminar(req, res, next) {
    try {
      await libroService.eliminarLibro(req.params.id);
      if (!eliminado) {
        return next(new NotFoundError('Libro no encontrado para eliminar.'));
      };
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },

  //Metodos de  consultas con relación a ejemplares y alquileres
  async obtenerMetricasLibros(req, res, next) {
    try {
      const metricas = await libroService.obtenerMetricasLibros();
      res.status(200).json(metricas);
    } catch (error) {
      next(error);
    }
  },

  async obtenerLibrosConEjemplares(req, res, next) {
    try {
      const librosConEjemplares = await libroService.obtenerLibrosConEjemplares();
      res.status(200).json(librosConEjemplares);
    } catch (error) {
      next(error);
    }
  },

  async obtenerLibrosConEjemplaresPorEstado(req, res, next) {
    const estado = req.params.estado ?? 'disponible'; 
    try {
      const librosPorEstado = await libroService.obtenerLibrosConEjemplaresPorEstado(estado);
      res.status(200).json(librosPorEstado);
    } catch (error) {
      next(error);
    }
  },

  async obtenerLibrosMasAlquiladosHistorico(req, res, next) {
    try {
      const librosMasAlquilados = await libroService.obtenerLibrosMasAlquiladosHistorico();
      res.status(200).json(librosMasAlquilados);
    } catch (error) {
      next(error);
    }
  },
};

module.exports = libroController;
