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

productRouter.get ("/", productController.lista);
productRouter.get ("/detail/:id", productController.detail);

productRouter.get('/crearProducto', productController.create);
productRouter.post("/", upload.single("Product"), productController.guardar)

productRouter.delete("/delete/:id",productController.destroy);

productRouter.get('/edit/:id', productController.edit);
productRouter.patch('/edit/:id', upload.single("Product"),productController.change);

/* productRouter.get("/",productController.catalogo) */
/* productRouter.post("/", upload.single("Product"), productController.store) */

module.exports = productRouter