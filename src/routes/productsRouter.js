const express = require ("express")
const productRouter = express.Router()
const multer  = require('multer')
const path = require("path")

const storage =multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/trek")
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))}

})

const upload = multer({storage:storage})

const productController = require ("../controllers/productController.js")

productRouter.get ("/", productController.catalogo);
productRouter.get ("/detail/:id", productController.detail);

productRouter.get('/crearProducto', productController.create);
productRouter.post("/", upload.single("Product"), productController.store)

productRouter.delete("/delete/:id",productController.destroy);

module.exports = productRouter