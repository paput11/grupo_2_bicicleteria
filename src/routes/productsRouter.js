const express = require("express")
const productRouter = express.Router()
const multer = require('multer')
const path = require("path")
const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/trek")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }

})
const upload = multer({ storage: storage })

const productController = require("../controllers/productController.js")

productRouter.get("/", productController.lista);
productRouter.get("/detail/:id", productController.detalle);

productRouter.get('/crearProducto', productController.crear);

//VALIDACIONES PARA PRODUCTOS
const productValidator = [
    // Condicion Nombre obligatorio y 5 de length
    body("name", "Nombre corto").isLength({ min: 5 }),
    // Condicion Descripcion min 20 de length
    body("descripcion", "Descripción corta").isLength({ min: 20 }),

];

productRouter.post("/", upload.single("Product"), productValidator, productController.guardar)
productRouter.delete("/delete/:id", productController.eliminar);
productRouter.get('/edit/:id', productController.modificar);
productRouter.patch('/edit/:id', upload.single("Product"), productController.editar);


//------------------------ Apis ----------------------------------------//

productRouter.get("/listaApi", productController.listaApi);
productRouter.get('/detalleApi/:id', productController.detalleApi);


/* productRouter.get("/",productController.catalogo) */
/* productRouter.get ("/detail/:id", productController.detail); */

/* productRouter.post("/", upload.single("Product"), productController.store) */

/* productRouter.get('/edit/:id', productController.edit); */
/* productRouter.patch('/edit/:id', upload.single("Product"),productController.change); */

/* productRouter.delete("/delete/:id",productController.destroy); */

module.exports = productRouter