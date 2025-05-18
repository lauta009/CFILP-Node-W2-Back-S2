const express = require('express');
const alquilerController = require('../controllers/alquiler.controller');
const {
  crearAlquilerValidator,
  devolverAlquilerValidator,
  obtenerAlquilerPorIdValidator,
} = require('../middlewares/validaciones/alquiler.validaciones'); 
const validarErrores = require('../middlewares/validaciones/validarErrores');

const router = express.Router();


router.get('/', alquilerController.obtenerTodosLosAlquileres);

router.get('/obtener-uno/:id', obtenerAlquilerPorIdValidator, validarErrores, alquilerController.obtenerAlquilerPorId);

router.get('/activos', alquilerController.obtenerAlquileresActivos);

router.get('/vencidos', alquilerController.obtenerAlquileresActivosVencidos);

router.post('/regular', crearAlquilerValidator, validarErrores, alquilerController.crearAlquilerRegular);

router.post('/premium', crearAlquilerValidator, validarErrores, alquilerController.crearAlquilerPremium);

router.post('/devolucion', devolverAlquilerValidator, validarErrores, alquilerController.devolverEjemplar);

module.exports = router;