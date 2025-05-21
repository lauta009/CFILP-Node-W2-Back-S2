const { Usuario, Rol } = require('../models');
const { NotFoundError } = require('../utils/appErrors');

const getAllUsuarios = async () => {
  return await Usuario.findAll({
    include: [
      {
        model: Rol,
        as: 'rol',
      },
    ],
  });
};

const getUsuarioById = async (id) => {
  const resultado = await Usuario.findByPk(id, {
    include: [
      {
        model: Rol,
        as: 'rol',
      },
    ],
  });
  if (!resultado) {
    throw new NotFoundError('Usuario no encontrado');
  }
  return resultado;
};

const createUsuario = async (data) => {
  return await Usuario.create(data);
};

const updateUsuario = async (id, data) => {
  const usuario = await Usuario.findByPk(id);

  if (!usuario) return  next(new NotFoundError('Usuario no encontrado'));
  await usuario.update(data);

  await usuario.save();
  return usuario;
};

const deleteUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return next(new NotFoundError('Usuario no encontrado'));
  usuario.estado = false; // Eliminacin lógica
  await usuario.save();
  return true;
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};