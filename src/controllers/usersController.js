const path = require ("path");
const fs = require ("fs");

const usersFilePath = path.join(__dirname,"../data/users.json")

const usersController = {
    login: (req,res) => { 
        res.render("login")
    },
    registro: (req,res) => {
        res.render ("registro");
    },

    store:(req,res) => {

    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    
    const newUser = {
      id: users[users.length-1].id + 1,
      nombre: req.body.nombre , 
      apellido: req.body.apellido,
      correo: req.body.correo,
      contrasenia: req.body.contrasenia,
      categoria: req.body.perfil,
      imagen: req.file ? req.file.fotoperfil : "default-image.jpg",
      edad: parseInt(req.body.edad),
      
    }
    users.push (newUser)
    let userJSON= JSON.stringify(users,null," ")
    fs.writeFileSync(usersFilePath, userJSON)

    res.redirect ("/catalogo")
 
  },

}



module.exports = usersController