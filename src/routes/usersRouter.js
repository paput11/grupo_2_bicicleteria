const express = require ("express");
const usersRouter = express.Router();


const usersController = require("../controllers/usersController.js");


const requireLogin = require ("../middlewares/requiereLogin.js")
const requireGuest = require ("../middlewares/requireGuest.js")
const upload = require ("../middlewares/upload.js")


usersRouter.get("/registro", requireGuest, usersController.registro);
usersRouter.post("/", requireGuest, upload.single("fotoperfil"), usersController.guardar)
usersRouter.get("/login", requireGuest, usersController.login);
usersRouter.post("/login", requireGuest, usersController.validacion);

// Rutas accesibles solo con login
usersRouter.get("/perfil", requireLogin, usersController.perfil);
usersRouter.post("/perfil", requireLogin, usersController.perfil);
usersRouter.get("/salir", requireLogin, usersController.salir);
usersRouter.get("/admin", requireLogin, usersController.lista);
usersRouter.get("/deleteUser/:id", requireLogin, usersController.eliminar);
usersRouter.get("/deleteUsers/:id", requireLogin, usersController.eliminarAdmin);
usersRouter.get("/editUser/:id", requireLogin, usersController.modificar);
usersRouter.post("/editUser/:id", requireLogin, upload.single("fotoperfil"), usersController.editar);

//------------------------ Apis ----------------------------------------//


usersRouter.get("/", usersController.list);
usersRouter.get('/:id',usersController.show);







/* usersRouter.post("/", requireGuest, upload.single("fotoperfil"), usersController.store); */
/* usersRouter.post("/login", requireGuest, usersController.loginProcess); */

/* usersRouter.get("/deleteUser/:id", requireLogin, usersController.destroy); */
/* usersRouter.get("/admin", requireLogin, usersController.list); */
/* usersRouter.get("/editUser/:id", requireLogin, usersController.editUser); */
/* usersRouter.post("/editUser/:id", requireLogin, upload.single("fotoperfil"), usersController.edit); */

module.exports = usersRouter;