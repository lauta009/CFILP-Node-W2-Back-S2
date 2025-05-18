const express = require('express');
const router = express.Router();
const userController = require('../Controllers/user.controller');
const { validarRegisterUsuario } = require('../middlewares/validaciones/usuario.validate');
const validarErrores = require('../middlewares/validaciones/validarErrores');


router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/',validarRegisterUsuario,validarErrores, userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;