// para rutas accesibles sin login
const requireGuest = (req, res, next) => {
  if (!req.session.userLogged) { // Si el usuario no está autenticado, pasa al siguiente 
    next();
  } /* else { // Si está autenticado, redirige al perfil
    res.redirect("/users/perfil");
  } */
};
  module.exports = requireGuest