const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');


const validarPassword = async (passwordPlano, passwordHasheado) => {
  return await bcrypt.compare(passwordPlano, passwordHasheado);
};

const buscarPorEmail = async (email) => {
  return await Usuario.findOne({ where: { email } });
};
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
module.exports = {
  hashPassword,
  validarPassword,
  buscarPorEmail,
};
