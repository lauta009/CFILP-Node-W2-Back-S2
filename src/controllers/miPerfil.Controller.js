const usuarioService = require('../services/user.service');
const authService = require('../services/auth.service');

const obtenerMiPerfil = async (req, res) => {
  try {
    const usuario = req.usuario;
    
    const usuarioEncontrado = await usuarioService.getUsuarioById(usuario.id);
    if (!usuarioEncontrado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Devolver el usuario sin la contraseña
    const { password, ...usuarioSinPassword } = usuarioEncontrado.dataValues;
    res.status(200).json(usuarioSinPassword);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener el perfil del usuario', err: error.message });
  }
};

const actualizarMiPerfil = async (req, res) => {
  try {
    const usuario = req.usuario;
    const { nombre,apellido, email, telefono, direccion, localidad } = req.body;
    
    const usuarioExistente = await usuarioService.getUsuarioById(usuario.id);
    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if(email != usuario.email){
      const emailExistente = await usuarioService.getUsuarioByEmail(email);
      if (emailExistente && emailExistente.id !== id) {
        return res
          .status(400)
          .json({ error: 'El email ya está en uso por otro usuario' });
      }
    }


    // Validar que el email no esté en uso por otro usuario

    // Actualizar el usuario
    const usuarioActualizado = await usuarioService.updateUsuario(usuario.id, {nombre,apellido, email, telefono, direccion, localidad });

    res.status(200).json({
      mensaje: 'Datos del usuario actualizados correctamente',
      usuario: usuarioActualizado  // solo si querés devolver los datos
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al actualizar el usuario', err: error.message });
  }
};
const actualizarPassword = async (req, res) => {
  try {
    
    const { password, password_actual } = req.body;

    // Validar que el usuario existe
    const usuarioExistente = await usuarioService.getUsuarioById(req.usuario.id);
    if (!usuarioExistente) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if(!authService.validarPassword(password_actual, usuarioExistente.password)){
      return res.status(400).json({ error: 'La contraseña actual no es correcta' });
    }
    // Actualizar la contraseña
    usuarioExistente.password = await authService.hashPassword(password);

    await usuarioService.updateUsuario(req.usuario.id, {password: usuarioExistente.password});

    res.status(201).json({message:'Password actualizada con éxito'});
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al actualizar la contraseña', err: error.message });
  }
};

module.exports = {
  actualizarMiPerfil,
  actualizarPassword,
  obtenerMiPerfil
};
