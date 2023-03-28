const express = require ("express")
const productRouter = express.Router()

const productController = require ("../controllers/productController.js")

productRouter.get ("/", productController.catalogo);

module.exports = productRouter