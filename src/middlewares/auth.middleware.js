const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
const rol = require('../models/rol');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.findByPk(decoded.id, {
      include: {
        association: 'rol',
        include: {
          association: 'permisos'
        }
      }
    });
    
    if (!usuario) return res.status(401).json({ error: 'Usuario no encontrado' });
    if (!usuario.estado) return res.status(401).json({ error: 'Usuario inactivo' });

    const permisos = usuario.rol?.permisos?.map(p => p.nombre) || [];

    // Adjuntá el usuario y permisos a la request
    req.usuario = {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol_id: usuario.rol_id,
      permisos
    };


    next();
  } catch (err) {
    console.error('Error al verificar el token:', err);
    res.status(401).json({ error: 'Token inválido' });
  }
};



const permisosCheck = (req, res, next) => {
  if(req.method === 'POST') { 
    var accion = 'gestionar';
  }else if(req.method === 'PUT') {
    var accion = 'gestionar';
  }else if(req.method === 'DELETE') {
    var accion = 'gestionar';
  }else{
    var accion = 'consultar';
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
module.exports = {
  authMiddleware,
  permisosCheck
};