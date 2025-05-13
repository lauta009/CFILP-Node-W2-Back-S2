const { Usuario } = require('../models/usuario');
const getAllUsuarios = async () => {
  return await Usuario.findAll({
    include: [
      {
        model: require('../models/rol').Rol,
        through: { attributes: [] }, // Exclude the join table attributes
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
  return usuario;
};

const deleteUsuario = async (id) => {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) return null;
  await usuario.destroy();
  return true;
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};