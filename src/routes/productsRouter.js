const express = require ("express")
const productRouter = express.Router()

const productController = require ("../controllers/productController.js")

productRouter.get ("/", productController.catalogo);

productRouter.get ("/detail/:id", productController.detail);

module.exports = productRouter