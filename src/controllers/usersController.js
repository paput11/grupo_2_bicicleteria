const path = require ("path")
const fs = require ("fs")
const bcryptjs = require ("bcryptjs")

const usersFilePath = path.join(__dirname,"../data/users.json")
const user = require("../models/LoginConfig");
const usersController = {
  
    login: (req,res) => { 
      res.render("login");
    },
    loginProcess: (req,res) => {
      let usoDeLogin = user.findByField("correo",req.body.email);
      if(usoDeLogin){
    let okLaContrasenia = bcryptjs.compareSync(req.body.password,usoDeLogin.contrasenia);
       if(okLaContrasenia){
              delete usoDeLogin.password;
              req.session.userLogged = usoDeLogin;
              return res.redirect("/users/perfil"); // [[USUARIO Para el PERFIL ]
          }else{
          return res.render("login",{
              errors:{
                  correo:{
                      msg:"Las credenciales son inválidas"
                  }
              }
            
          }) 
        }  
      }
      return res.render("login",{
          errors:{
              correo:{
                  msg:"no se encuentra este email en nuestra base de datos"
              }
             
          }   
      });  
      
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
      contrasenia: bcryptjs.hashSync (req.body.contrasenia,10),
      categoria: req.body.perfil,
      imagen: req.file ? req.file.filename : "default-image.jpg",
      edad: parseInt(req.body.edad),
      
    }
    users.push (newUser)
    let userJSON= JSON.stringify(users,null," ")
    fs.writeFileSync(usersFilePath, userJSON)

    res.redirect ("/catalogo")
 
    },

    list: (req,res)=> {
      const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      res.render("users",{users})

    },
    destroy :  (req, res) =>{
      let id = req.params.id;

      const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

      let finalusers = users.filter(user => {
        return user.id != id
      })
      
      let usersJSON = JSON.stringify(finalusers, null, " ");
    
      fs.writeFileSync(usersFilePath, usersJSON);

      res.redirect ("/users/users");
    },

    edit: (req, res) =>{
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    let id = req.params.id; 
    const user = users.find(user => user.id == id)
    
    const editUser = {
      id: parseInt(req.params.id),
      nombre: req.body.nombre , 
      apellido: req.body.apellido,
      correo: req.body.correo,
      contrasenia: bcrypt.hashSync (req.body.contrasenia,10),
      categoria: req.body.perfil,
      imagen: req.file ? req.file.filename : user.imagen,
      edad: parseInt(req.body.edad),
      
    }
    let indice= users.findIndex(user=>{return user.id==id})
      
      users [indice]= editUser;
      let usersJSON = JSON.stringify(users, null, " ");
      fs.writeFileSync(usersFilePath, usersJSON);

      res.redirect ("/users/users");
    },

    editUser: (req, res) => {
      const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      const id = req.params.id;
      const user = users.find(user => user.id == id);
      res.render("editarUser", {user})
    },

    perfil: function (req, res, next) {
      console.log("Estas en perfil");
      res.render("perfil", { user: req.session.userLogged });
    },


}

module.exports = usersController