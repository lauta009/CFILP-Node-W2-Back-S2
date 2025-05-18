const express = require('express');
const router = express.Router();
const {validarMiPerfilUsuario, validarPassword} = require('../middlewares/validaciones/usuario.validate');
const mi_perfilController = require('../Controllers/miPerfil.Controller');
const validarErrores = require('../middlewares/validaciones/validarErrores');

router.put('/actualizarMiPerfil',validarMiPerfilUsuario, validarErrores, mi_perfilController.actualizarMiPerfil);
router.put('/actualizarPassword',validarPassword, validarErrores, mi_perfilController.actualizarPassword);

module.exports = router;