const express = require ("express")
const productRouter = express.Router()

const productController = require ("../controllers/productController.js")

productRouter.get ("/", productController.catalogo);

productRouter.get ("/detail/:id", productController.detail);

productRouter.post("/crearProducto", productController.store)

module.exports = productRouter