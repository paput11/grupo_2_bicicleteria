const express = require("express");
const usersRouter = express.Router();
const { body, check } = require('express-validator');

const usersController = require("../controllers/usersController.js");

const requireLogin = require("../middlewares/requiereLogin.js")
const requireGuest = require("../middlewares/requireGuest.js")
const upload = require("../middlewares/upload.js")

// Esta ruteo es para /users y los sub ruteos
// son relativos a /users.

usersRouter.get("/registro", requireGuest, usersController.registro);
//VALIDACIONES PARA EL REGISTRO DE USUARIOS
const validateRegister = [
  upload.single("fotoperfil"),
  //Nombre y apellido
  //■ Obligatorio.
  //■ Deberá tener al menos 2 caracteres.
  body("nombre", "Nombre Erroneo").isLength({ min: 2 }),
  body("apellido", "Apellido Erroneo").isLength({ min: 2 }),
  //○ Email
  //■ Obligatorio.
  //■ Deberá ser un formato de e-mail válido.
  body("correo", "Email Erroneo").isEmail(),
  //■ No puede repetirse con los e-mails ya registrados.

  //○ Contraseña
  //■ Obligatoria.
  //■ Deberá tener al menos 8 caracteres.
  //■ (Opcional) → Deberá tener letras mayúsculas, minúsculas, un
  //número y un carácter especial.
  body("contrasenia", "Password Erroneo").isLength({ min: 8 }),
];
usersRouter.post("/", validateRegister, requireGuest, usersController.guardar);
usersRouter.get("/login", requireGuest, usersController.login);
usersRouter.post(
  "/login",
  body("email", "error de email").isEmail(),
  body("password", "error de password").isLength({ min: 8 }),
  requireGuest,
  usersController.validacion
);

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
usersRouter.get('/:id', usersController.show);



/* usersRouter.post("/", requireGuest, upload.single("fotoperfil"), usersController.store); */
/* usersRouter.post("/login", requireGuest, usersController.loginProcess); */

/* usersRouter.get("/deleteUser/:id", requireLogin, usersController.destroy); */
/* usersRouter.get("/admin", requireLogin, usersController.list); */
/* usersRouter.get("/editUser/:id", requireLogin, usersController.editUser); */
/* usersRouter.post("/editUser/:id", requireLogin, upload.single("fotoperfil"), usersController.edit); */

module.exports = usersRouter;