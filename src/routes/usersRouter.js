const express = require ("express");
const usersRouter = express.Router();


const usersController = require("../controllers/usersController.js");

const requireLogin = require ("../middlewares/requiereLogin.js")
const requireGuest = require ("../middlewares/requireGuest.js")
const upload = require ("../middlewares/upload.js")



usersRouter.get("/login", requireGuest, usersController.login);
usersRouter.post("/login", requireGuest, usersController.validacion);
usersRouter.get("/registro", requireGuest, usersController.registro);
usersRouter.post("/", requireGuest, upload.single("fotoperfil"), usersController.guardar)


// Rutas accesibles solo con login
usersRouter.get("/perfil", requireLogin, usersController.perfil);
usersRouter.get("/admin", requireLogin, usersController.lista);
usersRouter.get("/deleteUser/:id", requireLogin, usersController.eliminar);
usersRouter.get("/editUser/:id", requireLogin, usersController.modificar);
usersRouter.post("/editUser/:id", requireLogin, upload.single("fotoperfil"), usersController.editar);




/* usersRouter.post("/", requireGuest, upload.single("fotoperfil"), usersController.store); */
/* usersRouter.post("/login", requireGuest, usersController.loginProcess); */

/* usersRouter.get("/deleteUser/:id", requireLogin, usersController.destroy); */
/* usersRouter.get("/admin", requireLogin, usersController.list); */
/* usersRouter.get("/editUser/:id", requireLogin, usersController.editUser); */
/* usersRouter.post("/editUser/:id", requireLogin, upload.single("fotoperfil"), usersController.edit); */

module.exports = usersRouter;