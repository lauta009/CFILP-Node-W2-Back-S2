const { Alquiler, Ejemplar, Usuario, Libro } = require('../models');
const { differenceInDays } = require('date-fns');
const { Op } = require('sequelize');
const { NotFoundError, BadRequestError, UnauthorizedError } = require('../utils/appErrors');

// Cambiar estos valores según el tipo de usuario y lógica de negocio, por defecto son los valores para usuarios regulares
let limiteAlquileresSimultaneos = 3;
let limiteDiasDeAlquiler = 30;  

async function _verificarUsuarioActivo(usuarioId) {
  const usuario = await Usuario.findByPk(usuarioId);
  if (!usuario || !usuario.estado) {
    return next(new BadRequestError(`El usuario con ID ${usuarioId} no puede alquilar ya que se encuentra sancionado o no existe.`));
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
    return next(new NotFoundError(`El ejemplar con ID ${ejemplarId} no existe.`));
  }
  if (ejemplar.estado !== 'disponible') {
    return next(new BadRequestError(`El ejemplar con ID ${ejemplarId} no está disponible para alquiler.`));
  }
  return ejemplar;
}

async function _verificarLimiteAlquileres(usuarioId, limite) {
  const alquileresActivos = await Alquiler.count({ where: { usuario_id: usuarioId, fecha_devolucion: null } });
  if (alquileresActivos >= limite) {
    return next(new BadRequestError(`El usuario ha alcanzado el límite de ${limite} alquileres simultáneos (${limite}).`));
  }
}

async function _crearNuevoAlquiler(usuarioId, ejemplarId, fechaVencimiento) {
  // Verificar si ya existe un alquiler activo para este usuario y ejemplar
  const alquilerActivo = await Alquiler.findOne({
    where: {
      usuario_id: usuarioId,
      ejemplar_id: ejemplarId,
      fecha_devolucion: { [Op.eq]: null } // Que no se haya devuelto aún
    }
  });

  if (alquilerActivo) {
    throw next(new ConflictError('Este usuario ya tiene un alquiler activo para este ejemplar.'));
  }

  const now = new Date();
  const nuevoAlquiler = await Alquiler.create({
    usuario_id: usuarioId,
    ejemplar_id: ejemplarId,
    fecha_alquiler: now,
    fecha_vencimiento: fechaVencimiento,
    estado: 'pendiente',
  });

  if (!nuevoAlquiler) {
    return next(new BadRequestError('No se pudo crear el alquiler.'));
  }
  // Actualizar el estado del ejemplar a 'prestado'
  await Ejemplar.update({ estado: 'prestado' }, { where: { id: ejemplarId } });

  return nuevoAlquiler;
}

async function alquilarLibroRegular(usuarioId, ejemplarId) {
  const usuario = await _verificarUsuarioActivo(usuarioId);

  if (!usuario.rol_id === 2) {
    return next(new BadRequestError('El usuario no es regular.'));
  } 

  const ejemplar = await _verificarEjemplarDisponible(ejemplarId);

  if (!ejemplar) {
    return next(new NotFoundError(`El ejemplar con ID ${ejemplarId} no existe.`));
  }

  if (ejemplar.libro.es_premium) {
    return next(new UnauthorizedError('El ejemplar es premium y no puede ser alquilado por un usuario regular.'));
  }

  const fechaVencimiento = new Date(new Date().getTime() + (limiteDiasDeAlquiler * 24 * 60 * 60 * 1000)); 
  
  await _verificarLimiteAlquileres(usuario.id, limiteAlquileresSimultaneos); 
  return _crearNuevoAlquiler(usuario.id, ejemplar.id, fechaVencimiento);
}


async function alquilarLibroPremium(usuarioId, ejemplarId) {
  const usuario = await _verificarUsuarioActivo(usuarioId);

  if  (!usuario.rol_id === 1) {
    return next(new BadRequestError('El usuario no es premium.'));
  }
  const ejemplar = await _verificarEjemplarDisponible(ejemplarId);

  if (!ejemplar.libro.es_premium) {
    return next(new BadRequestError('El ejemplar no es premium y no puede ser alquilado por un usuario premium.'));   
  }

  limiteAlquileresSimultaneos = 6; //Límite de ejemplares alquilados al mismo tiempo para usuarios premium
  limiteDiasDeAlquiler = 60; // Límite de días de alquiler para usuarios premium

  
  const fechaVencimiento = new Date(new Date().getTime() + (limiteDiasDeAlquiler * 24 * 60 * 60 * 1000)); // 60 días de alquiler
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
    return next(new NotFoundError(`No se encontró un alquiler activo para el ejemplar con ID ${ejemplarId} y el usuario con ID ${usuarioId}.`));
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

  // 5. Si la devolución fue tardía, cambiar el estado del usuario a 'sancionado'
  // y devolver un mensaje indicando la sanción
  if (diferenciaDias > 0) {
    const usuario = await Usuario.findByPk(usuarioId);
    if (usuario) {
      await usuario.update({ estado: false });
      return { mensaje: `Ejemplar devuelto con ${diferenciaDias} días de retraso. Usuario con id = ${usuario.id} y nombre ${usuario.nombre} sancionado.` };    
    }else {
      return next(new NotFoundError(`No se encontró el usuario con ID ${usuarioId}.`));
    }
  }

  return { mensaje: `Ejemplar con ID ${ejemplarId} devuelto exitosamente.` };
}

async function obtenerTodosLosAlquileres() {
  
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
}

async function obtenerAlquilerPorId(id) {
  const alquiler = await Alquiler.findByPk(id, { 
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
  if (!alquiler) {
    return next(new NotFoundError(`Alquiler con ID ${id} no encontrado.`));
  }
  return alquiler;
}

async function obtenerAlquileresActivos() {
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
  if (!alquileresActivos) {
    return next(new NotFoundError('No se encontraron alquileres activos.'));
  }
  return alquileresActivos;
}

// Función para obtener alquileres activos que han vencido
// (es decir, aquellos que no han sido devueltos y cuya fecha de vencimiento es anterior a la fecha actual)
async function obtenerAlquileresActivosVencidos() {
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
  if (!alquileresVencidos) {
    return next(new NotFoundError('No se encontraron alquileres activos vencidos.'));
  }
  return alquileresVencidos;
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