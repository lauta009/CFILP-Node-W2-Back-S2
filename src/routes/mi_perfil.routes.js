const express = require('express');
const router = express.Router();
const {validarMiPerfilUsuario, validarPassword} = require('../middlewares/validaciones/usuario.validate');
const mi_perfilController = require('../Controllers/miPerfil.Controller');
const validarErrores = require('../middlewares/validaciones/validarErrores');
const { checkRolYPermisos } = require('../middlewares/auth.middleware');

router.get('/',  mi_perfilController.obtenerMiPerfil);

router.put('/actualizarMiPerfil', checkRolYPermisos(['admin', 'usuario', 'usuario_premium'], ['gestionar_mi_perfil']), validarMiPerfilUsuario, validarErrores, mi_perfilController.actualizarMiPerfil);

router.put('/actualizarPassword', checkRolYPermisos(['admin', 'usuario', 'usuario_premium'], ['gestionar_mi_perfil']), validarPassword, validarErrores, mi_perfilController.actualizarPassword);

module.exports = router;