const express = require ("express")
const usersRouter = express.Router()
const multer  = require('multer')
const path = require("path")

const storage =multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/images/users")
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))}

})
const upload = multer({storage:storage})

const usersController = require ("../controllers/usersController.js")

usersRouter.get("/users",usersController.list)

usersRouter.get("/login",usersController.login)

usersRouter.get("/registro",usersController.registro)

usersRouter.post("/",upload.single("fotoperfil"),usersController.store)

usersRouter.get("/deleteUser/:id",usersController.destroy)


module.exports = usersRouter