const usuarioService = require('../services/user.service');
const authService = require('../services/auth.service');
const { NotFoundError, BadRequestError, ConflictError} = require('../utils/appErrors');
const { nextDay } = require('date-fns');

const obtenerMiPerfil = async (req, res) => {
  try {
    const usuario = req.usuario;
    
    const usuarioEncontrado = await usuarioService.getUsuarioById(usuario.id);
    if (!usuarioEncontrado) {
      return next(new NotFoundError('Usuario no encontrado.'));
    }
    // Devolver el usuario sin la contraseña
    const { password, ...usuarioSinPassword } = usuarioEncontrado.dataValues;
    res.status(200).json(usuarioSinPassword);
  } catch (error) {
    next(error);
  }
};

const actualizarMiPerfil = async (req, res) => {
  try {
    const usuario = req.usuario;
    const { nombre,apellido, email, telefono, direccion, localidad } = req.body;
    
    const usuarioExistente = await usuarioService.getUsuarioById(usuario.id);
    if (!usuarioExistente) {
      return next(new NotFoundError('Usuario no encontrado en la base de datos para actualizar perfil.'));
    }
    if(email != usuario.email){
      const emailExistente = await usuarioService.getUsuarioByEmail(email);
      if (emailExistente && emailExistente.id !== id) {
        return next(new ConflictError('El email ya está registrado en esta base de datos. Por favor, utiliza otro.'));
      }
    }
    // Validar que el email no esté en uso por otro usuario

    // Actualizar el usuario
    const usuarioActualizado = await usuarioService.updateUsuario(usuario.id, {nombre,apellido, email, telefono, direccion, localidad });

    if (!usuarioActualizado) {
      return next(new BadRequestError('Error al actualizar los datos del usuario.'));
    }

    // Para devolver el usuario actualizado sin la contraseña
    const { password, ...usuarioSinPassword } = usuarioActualizado.dataValues;

    res.status(200).json({
      mensaje: 'Datos del usuario actualizados correctamente',
      usuario: usuarioSinPassword
    });
  } catch (error) {
    next(error);
  }
};

const actualizarPassword = async (req, res) => {
  try {
    
    const { password, password_actual } = req.body;

    // Validar que el usuario existe
    const usuarioExistente = await usuarioService.getUsuarioById(req.usuario.id);
    if (!usuarioExistente) {
      return next(new NotFoundError('Usuario no encontrado.'));
    }
    if(!authService.validarPassword(password_actual, usuarioExistente.password)){
      return next(new BadRequestError('Contraseña actual incorrecta.'));
    }
    // Actualizar la contraseña
    usuarioExistente.password = await authService.hashPassword(password);

    await usuarioService.updateUsuario(req.usuario.id, {password: usuarioExistente.password});

    res.json({message:'Password actualizada con éxito'});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  actualizarMiPerfil,
  actualizarPassword,
  obtenerMiPerfil
};
