const { Ejemplar, Libro } = require('../models');
const { NotFoundError } = require('../utils/appErrors');

async function crearEjemplar(datos) {
  const nuevoEjemplar = await Ejemplar.create(datos);
  return nuevoEjemplar;
}

async function obtenerEjemplarPorId(id) {
  const ejemplar = await Ejemplar.findByPk(id, {
    include: [{
      model: Libro,
      as: 'libro',
      attributes: ['id', 'titulo', 'isbn']
    }]
  });
  if (!ejemplar) {
    throw new NotFoundError('Ejemplar no encontrado');
  }
  return ejemplar;
}

async function obtenerEjemplarPorCodigoBarra(codigoBarra) {
  const ejemplar = await Ejemplar.findOne({
    where: { codigo_barra: codigoBarra },
    include: [{
      model: Libro,
      as: 'libro',
      attributes: ['id', 'titulo', 'isbn']
    }]
  });
  if (!ejemplar) {
    throw new NotFoundError(`Ejemplar con código de barra ${codigoBarra} no encontrado`);
  }
  return ejemplar;
}

async function obtenerTodosLosEjemplares(query) {
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
}

async function actualizarEjemplar(id, datos) {
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
  // Si no se encontró el ejemplar para actualizar
  throw new NotFoundError('Ejemplar no encontrado para actualizar');
}

async function eliminarEjemplar(id) {
  const filasEliminadas = await Ejemplar.destroy({
    where: { id }
  });
  if (filasEliminadas > 0) {
    return true;
  }
  throw new NotFoundError('Ejemplar no encontrado para eliminar');
}

module.exports = {
  obtenerEjemplarPorCodigoBarra,
  crearEjemplar,
  obtenerEjemplarPorId,
  obtenerTodosLosEjemplares,
  actualizarEjemplar,
  eliminarEjemplar,
};