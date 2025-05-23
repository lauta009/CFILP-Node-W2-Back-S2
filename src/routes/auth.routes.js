const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {validarRegisterUsuario, loginUsuarioValidate} = require('../middlewares/validaciones/usuario.validate');
const validarErrores = require('../middlewares/validaciones/validarErrores');

router.post('/login',loginUsuarioValidate,validarErrores, authController.login);

router.post('/register',validarRegisterUsuario,validarErrores, authController.register);
// FALTA AGREGAR EL CAMBIAR PASSWORD

module.exports = router;