const { Ejemplar, Libro } = require('../models');

async function crearEjemplar(datos) {
  try {
    const nuevoEjemplar = await Ejemplar.create(datos);
    return nuevoEjemplar;
  } catch (error) {
    console.error('Error al crear ejemplar:', error);
    throw error;
  }
}

async function obtenerEjemplarPorId(id) {
  try {
    const ejemplar = await Ejemplar.findByPk(id, {
      include: [{
        model: Libro,
        as: 'libro',
        attributes: ['id', 'titulo', 'isbn']
      }]
    });
    return ejemplar;
  } catch (error) {
    console.error('Error al obtener ejemplar:', error);
    throw error;
  }
}

async function obtenerEjemplarPorCodigoBarra(codigoBarra) {
  try {
    const ejemplar = await Ejemplar.findOne({
      where: { codigo_barra: codigoBarra },
      include: [{
        model: Libro,
        as: 'libro',
        attributes: ['id', 'titulo', 'isbn']
      }]
    });
    return ejemplar;
  } catch (error) {
    console.error('Error al obtener ejemplar por código de barra:', error);
    throw error;
  }
}

async function obtenerTodosLosEjemplares(query) {
  try {
    const { limit = 10, offset = 0, libro_id, codigo_barra, estado } = query;
    const where = {};

    if (libro_id) {
      where.libro_id = libro_id;
    }
    if (codigo_barra) {
      where.codigo_barra = codigo_barra;
    }
    if (estado) {
      where.estado = estado;
    }

    const { count, rows } = await Ejemplar.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{
        model: Libro,
        as: 'libro',
        attributes: ['id', 'titulo', 'es_premium']
      }]
    });

    return {
      total: count,
      limit: parseInt(limit),
      offset: parseInt(offset),
      ejemplares: rows
    };
  } catch (error) {
    console.error('Error al obtener todos los ejemplares:', error);
    throw error;
  }
}

async function actualizarEjemplar(id, datos) {
  try {
    const [filasActualizadas] = await Ejemplar.update(datos, {
      where: { id }
    });
    if (filasActualizadas > 0) {
      return await Ejemplar.findByPk(id, {
        include: [{
          model: Libro,
          as: 'libro',
          attributes: ['id', 'titulo']
        }]
      });
    }
    return null; // No se encontró el ejemplar para actualizar
  } catch (error) {
    console.error('Error al actualizar ejemplar:', error);
    throw error;
  }
}

async function eliminarEjemplar(id) {
  try {
    const filasEliminadas = await Ejemplar.destroy({
      where: { id }
    });
    return filasEliminadas > 0;
  } catch (error) {
    console.error('Error al eliminar ejemplar:', error);
    throw error;
  }
}

module.exports = {
  obtenerEjemplarPorCodigoBarra,
  crearEjemplar,
  obtenerEjemplarPorId,
  obtenerTodosLosEjemplares,
  actualizarEjemplar,
  eliminarEjemplar,
};