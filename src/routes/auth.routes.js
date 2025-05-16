const express = require('express');
const router = express.Router();
const authController = require('../Controllers/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);
// FALTA AGREGAR EL CAMBIAR PASSWORD

module.exports = router;