// rutas accesibles solo con login
const requireLogin = (req, res, next) => {
    if (req.session.userLogged) { // Si da ok la autenticacion, pasa al siguiente 
      next();
    } else { // Si el usuario no esta autenticado, redirige a la página de inicio de sesión
      res.redirect("/users/login");
    }
  };

  module.exports = requireLogin