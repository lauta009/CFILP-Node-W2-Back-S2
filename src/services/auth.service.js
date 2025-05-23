const bcrypt = require('bcryptjs');
const { Usuario } = require('../models');
const { NotFoundError, BadRequestError} = require('../utils/appErrors');


const validarPassword = async (passwordPlano, passwordHasheado) => {
  const resultado =await bcrypt.compare(passwordPlano, passwordHasheado);
  if (!resultado) {
    throw new BadRequestError('Contraseña incorrecta.');
  }
  return resultado;
};

const buscarPorEmail = async (email) => {
  const resultado = await Usuario.findOne({ where: { email } });
  return resultado;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

module.exports = {
  hashPassword,
  validarPassword,
  buscarPorEmail,
};
