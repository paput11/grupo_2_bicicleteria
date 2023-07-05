const path = require("path")
const bcryptjs = require("bcryptjs")
const db = require("../database/models")
const { body, validationResult } = require('express-validator');

const usersController = {
  login: (req, res) => {
    res.render("login");
  },

  validacion: (req, res) => {
    const result = validationResult(req).array();

    if (result.length) {
      console.log("hay error", result);
      return res.render("login", {
        errors: {
          correo: {
            msg: "Las credenciales inválidas"
          }
        }
      });
    } else {
      // buscamos el usuario en la db
      db.user
        .findOne({ where: { mail: req.body.email } })
        .then(user => {
          if (!user) {
            return res.render("login", {
              errors: {
                correo: {
                  msg: "Las credenciales son inválidas"
                }
              }
            });
          }
          const contrasenia = bcryptjs.compareSync(
            req.body.password,
            user.dataValues.contraseña
          );
          if (contrasenia) {
            req.session.userLogged = user.dataValues;
            return res.redirect("/users/perfil");
          } else {
            return res.render("login", {
              errors: {
                correo: {
                  msg: "Las credenciales son inválidas"
                }
              }
            });
          }
        })
        .catch(errors => {
          return res.render("login", {
            errors: {
              correo: {
                msg: "No se encuentra este email en nuestra base de datos"
              }
            }
          });
        });
    }


  },

  perfil: function (req, res) {
    console.log("Estas en perfil")
    db.user.findByPk(req.session.userLogged.id)
      .then((newUser) => {
        req.session.userLogged = newUser.dataValues
        res.render("perfil", { user: req.session.userLogged })
      }
      )

  },
  registro: (req, res) => {
    res.render("registro");
  },
  guardar: async (req, res) => {
    // verificar las necesidades de los campos
    const result = validationResult(req).array();
    console.log(result)
    //
    let isEmailValid = false;
    //chequeo de existencia de email
    const user = await db.user
      .findOne({ where: { mail: req.body.correo } })
      .then(user => {
        if (!user) {
          isEmailValid = true;
        } 
      })
      console.log(isEmailValid);
      console.log({mail: req.body.correo});
    //si hay errores
    if (result.length || !isEmailValid) {
      return res.render("registro", {
        errors: [
          //si el email existe
          !isEmailValid && {
            field: "correo",
            msg: "el email es invalido"
          },
          ...result.map((result) => {
            return ({
              field: result.path,
              msg: result.msg
            });
          })
        ]
      });
    } else {
      //
      //○ Imagen
      //■ Deberá ser un archivo válido (JPG, JPEG, PNG, GIF).
      const isImageValid = () => {
        let isValid = false;

        if (req.file) {
          const validExtentions = ["jpeg", "jpg", "gif", "png"];
          const fileExtention = req.file.originalname.split(".")[1];
          isValid = validExtentions.includes(fileExtention);
          //console.log({ validExtentions, fileExtention, isValid });
        }

        return isValid;
      };
      
      db.user.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        mail: req.body.correo,
        contraseña: bcryptjs.hashSync(req.body.contrasenia, 10),
        categoria_id: parseInt(req.body.perfil),
        imagen: isImageValid() ? req.file.filename : "default-image.jpg",
        edad: parseInt(req.body.edad)
      })
        .then(usuario => {
          req.session.userLogged = usuario.dataValues;
          res.render("perfil", { user: usuario.dataValues });
        });
    }
  },

  lista: (req, res) => {
    db.user
      .findAll()
      .then(function (users) {
        res.render("users", { users });
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Error al obtener los usuarios");
      });
  },

  eliminar: (req, res) => {
    db.user
      .destroy({ where: { id: req.params.id } })
      .then(() => {
        req.session.userLogged = undefined;
        res.redirect("/");
      })
      .catch(error => {
        console.error(error);
        res.status(500).send("Error al eliminar el usuario");
      });
  },

  editar: (req, res) => {
    db.user
      .findByPk(req.params.id)
      .then(oldUser => {
        let editUser = {
          id: parseInt(req.params.id),
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          mail: req.body.correo,
          contraseña: bcryptjs.hashSync(req.body.contrasenia, 10),
          categoria_id: req.body.perfil == undefined ? oldUser.categoria_id : parseInt(req.body.perfil),
          imagen: req.file ? req.file.filename : oldUser.imagen,
          edad: parseInt(req.body.edad)
        }
        return editUser
      })
      .then((editUser) => {
        return db.user.update(editUser, { where: { id: req.params.id } })
      })
      .then(res.redirect("/users/perfil"))

  },

  modificar: (req, res) => {
    db.user
      .findByPk(req.params.id)
      .then(user => res.render("editarUser", { user }))
      .catch(error => {
        console.error(error);
        res.status(500).send("Error al obtener el usuario");
      });
  },

  salir: (req, res) => {
    req.session.userLogged = undefined;
    res.redirect("login");
  },

  eliminarAdmin: (req, res) => {
    db.user
      .destroy({ where: { id: req.params.id } })
      .then(() => res.redirect("/users/admin"))
      .catch(error => {
        console.error(error);
        res.status(500).send("Error al eliminar el usuario");
      });
  },

  list: (req, res) => {
    db.user
      .findAll()
      .then(user => {
        return res.status(200).json({
          total: user.length,
          data: user,
          status: 200
        });
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener los usuarios' });
      });
  },

  show: (req, res) => {
    db.user
      .findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        return res.status(200).json({
          data: user,
          status: 200
        });
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el usuario' });
      });
  }
};

module.exports = usersController;
