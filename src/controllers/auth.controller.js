const jwt = require('jsonwebtoken');
const {createUsuario, updateUsuario} = require('../services/user.service');
const authService = require('../services/auth.service');
const { NotFoundError, BadRequestError, UnauthorizedError, ForbiddenError, ConflictError} = require('../utils/appErrors');



async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const usuario = await authService.buscarPorEmail(email);
    if (!usuario) {
      return next(new NotFoundError('Usuario no encontrado.'));
    }
    const passwordValido = await authService.validarPassword(password, usuario.password);
    if (!passwordValido) {
      return next(new BadRequestError('Contraseña incorrecta.'));
    }
    if(!usuario.estado){
      return next(new ForbiddenError('Usuario inactivo.'));
    }
    // Generar el token JWT
    const token = jwt.sign({ id: usuario.id, rol_id:usuario.rol_id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN, 
    });

    if (!token) {
      return next(new UnauthorizedError('Error al generar el token.'));
    }

    let usuarioFront = {
      apellido: usuario.apellido,
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      direccion: usuario.direccion,
      localidad: usuario.localidad,
      nro_doc: usuario.nro_doc,
      cod_postal: usuario.cod_postal,
      };
    usuario.ultimo_login = new Date();

    const ultimoLogin = await updateUsuario(usuario.id, {ultimo_login:usuario.ultimo_login});
    if (!ultimoLogin) {
      return next(new BadRequestError('Error interno al loguearse'));
    }
    
    res.json({ token , usuario: usuarioFront });
  } catch (error) {
    next(error);
  }
}

const register = async (req, res, next) => {
  try {
    const { nombre, apellido, email, password, telefono, direccion, localidad, nro_doc, cod_postal  } = req.body;
    // Validar que el email no esté ya registrado
    const usuarioExistente = await authService.buscarPorEmail(email);
    if (usuarioExistente) {
      return next(new ConflictError('El email ya está registrado en esta base de datos. Por favor, utiliza otro.'));
    }
    const hashedPassword = await authService.hashPassword(password);

    const nuevoUsuario = await createUsuario({
      nombre,
      apellido,
      email,
      rol_id: 2, // Asignar rol de usuario por defecto
      estado: true,
      password: hashedPassword,
      telefono,
      direccion,
      localidad,
      nro_doc,
      cod_postal
    });


    if (!nuevoUsuario) {
      return next(new BadRequestError('Error al registrar el usuario en la base de datos.'));
    }
    res.status(201).json({ message: 'Usuario creado correctamente',data: nuevoUsuario});

  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  register,
};
