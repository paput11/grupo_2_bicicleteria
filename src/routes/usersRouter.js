const express = require ("express");
const usersRouter = express.Router();
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "public/images/users")
  },
  filename: function (req, file, cb){
    cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname))
  }
});
const upload = multer({storage:storage});

const usersController = require("../controllers/usersController.js");

const requireLogin = require ("../middlewares/requiereLogin.js")
const requireGuest = require ("../middlewares/requireGuest.js")


usersRouter.get("/login", requireGuest, usersController.login);
usersRouter.post("/login", requireGuest, usersController.loginProcess);

usersRouter.get("/registro", requireGuest, usersController.registro);
usersRouter.post("/", requireGuest, upload.single("fotoperfil"), usersController.guardar)


// Rutas accesibles solo con login
usersRouter.get("/perfil", requireLogin, usersController.perfil);
usersRouter.get("/admin", requireLogin, usersController.list);
usersRouter.get("/deleteUser/:id", requireLogin, usersController.destroy);
usersRouter.post("/editUser/:id", requireLogin, upload.single("fotoperfil"), usersController.edit);
usersRouter.get("/editUser/:id", requireLogin, usersController.editUser);




/* usersRouter.post("/", requireGuest, upload.single("fotoperfil"), usersController.store); */

module.exports = usersRouter;