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

// rutas accesibles sol con login
const requireLogin = (req, res, next) => {
  if (req.session.userLogged) { // Si da ok la autenticacion, pasa al siguiente 
    next();
  } else { // Si el usuario no esta autenticado, redirige a la página de inicio de sesión
    res.redirect("/users/login");
  }
};

// para rutas accesibles sin login
const requireGuest = (req, res, next) => {
  if (!req.session.userLogged) { // Si el usuario no está autenticado, pasa al siguiente 
    next();
  } else { // Si está autenticado, redirige al perfil
    res.redirect("/users/perfil");
  }
};

usersRouter.get("/login", requireGuest, usersController.login);
usersRouter.post("/login", requireGuest, usersController.loginProcess);

usersRouter.get("/registro", requireGuest, usersController.registro);
usersRouter.post("/", requireGuest, upload.single("fotoperfil"), usersController.store);

// Rutas accesibles solo con login
usersRouter.get("/perfil", requireLogin, usersController.perfil);
usersRouter.get("/admin", requireLogin, usersController.list);
usersRouter.get("/deleteUser/:id", requireLogin, usersController.destroy);
usersRouter.post("/editUser/:id", requireLogin, upload.single("fotoperfil"), usersController.edit);
usersRouter.get("/editUser/:id", requireLogin, usersController.editUser);

module.exports = usersRouter;