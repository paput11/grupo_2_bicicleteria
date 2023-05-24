const express = require("express");
const routerProductosBicicleta = express.Router();
const productBicicleteria = require("../controllers/controladorBicicletas");


router.get("/crear",productBicicleteria.crear);








module.exports = routerProductosBicicleta;