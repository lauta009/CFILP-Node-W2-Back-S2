const jwt = require('jsonwebtoken');
const {createUsuario} = require('../services/user.service');
const authService = require('../services/auth.service');


async function login(req, res) {
  try {
    const { email, password } = req.body;
    const usuario = await authService.buscarPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    console.log('usuario', usuario);
    const passwordValido = await authService.validarPassword(password, usuario.password);
    if (!passwordValido) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    console.log('usuario', process.env.JWT_EXPIRES_IN);
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

const register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono, direccion, localidad  } = req.body;
    // Validar que el email no esté ya registrado
    const usuarioExistente = await authService.buscarPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }
    const hashedPassword = await authService.hashPassword(password);
    console.log('typeof',typeof hashedPassword);
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
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};
module.exports = {
  login,
  register,
};
