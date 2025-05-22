const usuarioService = require('../services/user.service');
const { NotFoundError, BadRequestError } = require('../utils/appErrors');

const getAll = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.getAllUsuarios();
    res.json(usuarios);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.params.id);
    if (!usuario) return next(new NotFoundError('Usuario no encontrado'));
    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const nuevoUsuario = await usuarioService.createUsuario(req.body);
    res.status(201).json('Usuario creado correctamente: ' + nuevoUsuario);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    console.log((req.body));
    const usuario = await usuarioService.updateUsuario(req.params.id, req.body);
    if (!usuario) return next(new NotFoundError('Usuario no encontrado'));
    res.json(usuario);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const eliminado = await usuarioService.updateUsuario(req.params.id, { estado: false });

    if (!eliminado) return next(new NotFoundError('Usuario no encontrado'));
    if (eliminado.estado === false) return next(new BadRequestError('El usuario ya estaba eliminado o sancionado'));
    
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};