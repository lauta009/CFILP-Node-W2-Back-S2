const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { validarRegisterUsuario } = require('../middlewares/validaciones/usuario.validate');
const validarErrores = require('../middlewares/validaciones/validarErrores');
const { checkRolYPermisos } = require('../middlewares/auth.middleware');


router.get('/', checkRolYPermisos('admin', ['consultar_users']), userController.getAll);
router.get('/:id', checkRolYPermisos('admin', ['consultar_users']), userController.getById);
router.post('/', checkRolYPermisos(['admin'], ['gestionar_users']), validarRegisterUsuario,validarErrores, userController.create);
router.put('/:id', checkRolYPermisos(['admin'], ['gestionar_users']), validarErrores, userController.update);
router.delete('/:id', checkRolYPermisos(['admin'], ['gestionar_users']), userController.remove);

module.exports = router;