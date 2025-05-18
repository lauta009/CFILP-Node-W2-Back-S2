const { Usuario, Rol } = require('../models');
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
  return await Usuario.findByPk(id);
};

const createUsuario = async (data) => {
  return await Usuario.create(data);
};

const updateUsuario = async (id, data) => {
  const usuario = await Usuario.findByPk(id);

  if (!usuario) return null;
  await usuario.update(data);

  await usuario.save();
  return usuario;
};

const deleteUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  usuario.estado = false; // Cambia el estado a false en lugar de eliminar
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