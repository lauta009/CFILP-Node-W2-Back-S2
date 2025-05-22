const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const { NotFoundError, ForbiddenError, UnauthorizedError} = require('../utils/appErrors');


const authMiddleware = async (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Token no proporcionado o formato incorrecto'));
  }

  const token = authHeader.split(' ')[1];

  if (token === ' ') return next(new ForbiddenError('Token inválido'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return next(new ForbiddenError('Token inválido'));

    const usuario = await Usuario.findByPk(decoded.id, {
      include: {
        association: 'rol',
        include: {
          association: 'permisos'
        }
      }
    });
    
    if (!usuario) return next(new NotFoundError('Usuario no encontrado'));
    if (usuario.estado === false) return next(new ForbiddenError('Usuario inactivo'));

    const permisos = usuario.rol?.permisos?.map(p => p.nombre) || [];

    if (!permisos.length) {
      return next(new ForbiddenError('El rol no tiene permisos asignados'));
    }

    // Se incorpora el usuario y los permisos a la request
    req.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol_id: usuario.rol_id,
      rol_nombre: usuario.rol? usuario.rol.nombre : null,
      permisos:  permisos,
    };

    next();

  } catch ( error) {
    console.log(error);
    return next(new ForbiddenError('Token inválido'));
  }
};


// ----------Verificación de Rol y/o Permisos--------

const checkRolYPermisos = (rolesNecesarios = null, permisosNecesariosParam = []) => {
  return (req, res, next) => {
    // Los permisosNecesarios deben ser siempre un array
    const permisosNecesarios = Array.isArray(permisosNecesariosParam) ? permisosNecesariosParam : [permisosNecesariosParam].filter(Boolean);
        
    // Convertir rolesNecesarios a un array si no lo es
    let rolesToCheck = [];
    if (rolesNecesarios === null) {
      rolesToCheck = [];
    } else if (Array.isArray(rolesNecesarios)) {
      rolesToCheck = rolesNecesarios;
    } else {
      rolesToCheck = [rolesNecesarios];
    }

    if (!req.usuario) {
      console.error('Error: req.usuario no está definido en checkRoleAndPermissions. Asegúrate de que authMiddleware se ejecuta primero.');
      return next(new UnauthorizedError('Usuario no autenticado.'));
    }

    const { rol_nombre, permisos } = req.usuario;

    // 1. Verificar Rol 
    if (rolesToCheck.length > 0) { 
      if (!rolesToCheck.includes(rol_nombre)) { // Si el rol no existe...
        console.warn(`Acceso denegado: Rol '${rol_nombre}' no es uno de los roles permitidos para la ruta ${req.method} ${req.path}. Roles permitidos: [${rolesToCheck.join(', ')}]`);
        return next(new ForbiddenError(`Acceso denegado. Se requiere uno de los roles: ${rolesToCheck.join(', ')}.`));
      }
    }

    // 2. Verificar Permisos
    if (permisosNecesarios.length > 0) { 
      const tieneTodosLosPermisos = permisosNecesarios.every(requiredPermiso =>
        permisos.includes(requiredPermiso)
      );

      if (!tieneTodosLosPermisos) {
        console.warn(`Acceso denegado: Usuario '${req.usuario.email}' no tiene todos los permisos requeridos para la ruta ${req.method} ${req.path}. Permisos necesarios: [${permisosNecesarios.join(', ')}], Permisos del usuario: [${permisos.join(', ')}]`);
        return next(new ForbiddenError('No tienes los permisos necesarios para realizar esta acción.'));
      }
    }

    next();
  };
};

//Función general de checkeo de permisos a nivel de app
const permisosCheck = (req, res, next) => {
  
  if(req.method === 'POST' || req.method === 'PATCH' || req.method === 'PUT' || req.method === 'DELETE') { 
    accion = 'gestionar';
  }else{
    accion = 'consultar';
  }
  const ruta = req.path; // por ejemplo, /libros/123
  const partes = ruta.split('/').filter(Boolean); // ['libros', '123']
  const recurso = partes[0]; // 'libros
  const permiso = `${accion}_${recurso}`;

  const permisosBD = req.usuario.permisos; // ['gestionarLibros', 'consultarLibros', 'eliminarLibros']
  if( permisosBD.includes(permiso)) {
    next();
  }
  else {
    return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
  }
}; 

let accion = '';

module.exports = {
  authMiddleware,
  checkRolYPermisos,
};