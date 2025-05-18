const { Alquiler, Ejemplar, Usuario, Libro, Rol } = require('../models');
const { differenceInDays } = require('date-fns');
const { Op } = require('sequelize');

// Cambiar estos valores según el tipo de usuario y lógica de negocio, por defecto son los valores para usuarios regulares
let limiteAlquileresSimultaneos = 3;
let limiteDiasDeAlquiler = 30;  

async function _verificarUsuarioActivo(usuarioId) {
  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario || !usuario.estado) {
    throw new Error(`El usuario con ID ${usuarioId} no puede alquilar ya que se encuentra sancionado o no existe.`);
  }
  return usuario;
}

async function _verificarEjemplarDisponible(ejemplarId) {
  const ejemplar = await Ejemplar.findByPk(ejemplarId, { include: [
    { 
      model: Libro, 
      as: 'libro', 
      attributes: ['es_premium'] 
    }
  ] });
  if (!ejemplar) {
    throw new Error(`El ejemplar con ID ${ejemplarId} no existe.`);
  }
  if (ejemplar.estado !== 'disponible') {
    throw new Error(`El ejemplar con ID ${ejemplarId} no está disponible.`);
  }
  return ejemplar;
}

async function _verificarLimiteAlquileres(usuarioId, limite) {
  const alquileresActivos = await Alquiler.count({ where: { usuario_id: usuarioId, fecha_devolucion: null } });
  if (alquileresActivos >= limite) {
    throw new Error(`El usuario ha alcanzado el límite de ${limite} alquileres simultáneos (${limite}).`);
  }
}

async function _crearNuevoAlquiler(usuarioId, ejemplarId, fechaVencimiento) {
  const now = new Date();
  const nuevoAlquiler = await Alquiler.create({
    usuario_id: usuarioId,
    ejemplar_id: ejemplarId,
    fecha_alquiler: now,
    fecha_vencimiento: fechaVencimiento,
    estado: 'pendiente',
  });
  await Ejemplar.update({ estado: 'prestado' }, { where: { id: ejemplarId } });
  return nuevoAlquiler;
}

async function alquilarLibroRegular(usuarioId, ejemplarId) {
  const usuario = await _verificarUsuarioActivo(usuarioId);
  const ejemplar = await _verificarEjemplarDisponible(ejemplarId);

  if (ejemplar.libro.es_premium) {
    throw new Error('Los usuarios regulares no pueden alquilar libros premium.');
  }

  const fechaVencimiento = new Date(new Date().getTime() + (limiteDiasDeAlquiler * 24 * 60 * 60 * 1000)); 
  
  await _verificarLimiteAlquileres(usuario.id, limiteAlquileresSimultaneos); 
  return _crearNuevoAlquiler(usuario.id, ejemplar.id, fechaVencimiento);
}


async function alquilarLibroPremium(usuarioId, ejemplarId) {
  const usuario = await _verificarUsuarioActivo(usuarioId);
  const ejemplar = await _verificarEjemplarDisponible(ejemplarId);

  limiteAlquileresSimultaneos = 6; //Límite de ejemplares alquilados al mismo tiempo para usuarios premium
  limiteDiasDeAlquiler = 60; // Límite de días de alquiler para usuarios premium

  const fechaVencimiento = new Date(new Date().getTime() + (limiteDiasDeAlquiler * 24 * 60 * 60 * 1000)); 
  await _verificarLimiteAlquileres(usuario.id, limiteAlquileresSimultaneos); 
  return _crearNuevoAlquiler(usuario.id, ejemplar.id, fechaVencimiento);
}


async function devolverEjemplar(usuarioId, ejemplarId) {
  // 1. Verificar si existe un alquiler activo para este usuario y ejemplar
  const alquilerActivo = await Alquiler.findOne({
    where: {
      usuario_id: usuarioId,
      ejemplar_id: ejemplarId,
      fecha_devolucion: null
    },
    include: [{
      model: Ejemplar,
      as: 'ejemplar'
    }]
  });

  if (!alquilerActivo) {
    throw new Error(`No se encontró un alquiler activo para el ejemplar ID ${ejemplarId} del usuario ID ${usuarioId}.`);
  }

  // 2. Registrar la fecha de devolución
  const fechaDevolucion = new Date();
  await alquilerActivo.update({ fecha_devolucion: fechaDevolucion, estado: 'devuelto' });

  // 3. Actualizar el estado del ejemplar a 'disponible'
  await Ejemplar.update({ estado: 'disponible' }, {
    where: { id: ejemplarId }
  });

  // 4. Verificar si la devolución fue tardía y cambiar el estado del usuario si es necesario
  const fechaVencimiento = alquilerActivo.fecha_vencimiento;
  const diferenciaDias = differenceInDays(fechaDevolucion, fechaVencimiento);

  if (diferenciaDias > 0) {
    const usuario = await Usuario.findByPk(usuarioId);
    if (usuario) {
      await usuario.update({ estado: false });
      return { mensaje: `Ejemplar devuelto con ${diferenciaDias} días de retraso. Usuario con id = ${usuario.id} y nombre ${usuario.nombre} sancionado.` };    
    }else {
      throw new Error(`No se encontró el usuario con ID ${usuarioId}.`);
    }
  }

  return { mensaje: `Ejemplar con ID ${ejemplarId} devuelto exitosamente.` };
}

async function obtenerTodosLosAlquileres() {
  try {
    const alquileres = await Alquiler.findAll({
      include: [
        {
          model: Ejemplar,
          as: 'ejemplar',
          attributes: ['id', 'codigo_barra'],
          include: [{
            model: Libro,
            as: 'libro',
            attributes: ['titulo']
          }]
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email']
        }
      ]
    });
    return alquileres;
  } catch (error) {
    console.error('Error al obtener todos los alquileres:', error);
    throw error;
  }
}

async function obtenerAlquilerPorId(id) {
  try {
    const alquiler = await Alquiler.findByPk(id, { // <--- ¡Este es el punto clave!
      include: [
        {
          model: Ejemplar,
          as: 'ejemplar',
          attributes: ['id', 'codigo_barra'],
          include: [{
            model: Libro,
            as: 'libro',
            attributes: ['titulo']
          }]
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email']
        }
      ]
    });
    return alquiler;
  } catch (error) {
    console.error(`Error al obtener el alquiler con ID ${id}:`, error);
    throw error;
  }
}

async function obtenerAlquileresActivos() {
  try {
    const alquileresActivos = await Alquiler.findAll({
      where: {
        fecha_devolucion: null
      },
      include: [
        {
          model: Ejemplar,
          as: 'ejemplar',
          attributes: ['id', 'codigo_barra'],
          include: [{
            model: Libro,
            as: 'libro',
            attributes: ['titulo']
          }]
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email']
        }
      ]
    });
    return alquileresActivos;
  } catch (error) {
    console.error('Error al obtener los alquileres activos:', error);
    throw error;
  }
}

async function obtenerAlquileresActivosVencidos() {
  try {
    const now = new Date();
    const alquileresVencidos = await Alquiler.findAll({
      where: {
        fecha_devolucion: null,
        fecha_vencimiento: { [Op.lt]: now } // fecha_vencimiento es menor que la fecha actual
      },
      include: [
        {
          model: Ejemplar,
          as: 'ejemplar',
          attributes: ['id', 'codigo_barra'],
          include: [{
            model: Libro,
            as: 'libro',
            attributes: ['titulo']
          }]
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre', 'email']
        }
      ]
    });
    return alquileresVencidos;
  } catch (error) {
    console.error('Error al obtener los alquileres activos vencidos:', error);
    throw error;
  }
}


module.exports = {
  alquilarLibroRegular,
  alquilarLibroPremium,
  devolverEjemplar,
  obtenerTodosLosAlquileres,
  obtenerAlquilerPorId,
  obtenerAlquileresActivos,
  obtenerAlquileresActivosVencidos
};