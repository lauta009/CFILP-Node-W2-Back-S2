const express = require('express');
const ejemplaresController = require('../controllers/ejemplares.controller');

const router = express.Router();

router.post('/ejemplares', ejemplaresController.crear);
router.get('/ejemplares', ejemplaresController.obtenerTodos);
router.get('/ejemplares/:id', ejemplaresController.obtenerUno);
router.put('/ejemplares/:id', ejemplaresController.actualizar);
router.delete('/ejemplares/:id', ejemplaresController.eliminar);

module.exports = router;