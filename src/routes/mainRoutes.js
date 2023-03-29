const express = require ("express")
const mainRouter = express.Router()

const mainController = require ("../controllers/mainController.js")

mainRouter.get ("/", mainController.home);

mainRouter.get ("/registro", mainController.registro);

mainRouter.get ("/contacto", mainController.contacto);

mainRouter.get ("/accesorios", mainController.accesorios);

mainRouter.get ("/indumentaria", mainController.indumentaria);

mainRouter.get ("/login", mainController.login);

mainRouter.get ("/terminos", mainController.terminos);

mainRouter.get ("/politicas", mainController.politicas);

mainRouter.get ("/copy", mainController.copy);

mainRouter.get ("/rental", mainController.rental);

mainRouter.get ("/carro", mainController.carro);

mainRouter.get ("/tours", mainController.tours);

mainRouter.get ("/crearProducto", mainController.crearProducto);

mainRouter.get ("/editarProducto", mainController.editarProducto);

module.exports = mainRouter 