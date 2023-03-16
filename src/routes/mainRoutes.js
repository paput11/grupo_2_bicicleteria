const express = require("express");
const router = express.Router();

const productosController = require('../controllers/mainController');

router.get('/compra', productosController.compraRealizada);

router.get('/user', productosController.usuarioCreado);

module.exports = router;
