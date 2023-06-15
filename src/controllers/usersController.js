const path = require ("path")
const fs = require ("fs")
const bcryptjs = require ("bcryptjs")
const db = require ("../database/models")
const {Op} = require ("sequelize")


const usersFilePath = path.join(__dirname,"../data/users.json")
const user = require("../models/LoginConfig");

const usersController = {
    login: (req,res) => { 
      res.render("login");
    },

    validacion:(req,res) => {
      
      db.user.findOne({where:{mail: req.body.email}})
      .then(user=> {
        const contrasenia =  bcryptjs.compareSync(req.body.password,user.dataValues.contraseña)   
        if(contrasenia) {
          req.session.userLogged = user.dataValues;
          return res.redirect("/users/perfil")
        }else{
          return res.render("login",{
              errors:{
                  correo:{
                      msg:"Las credenciales son inválidas"
                  }
              }
          })
        
        }
      })      
      .catch((errors)=>{
      return res.render("login",{
        errors:{
            correo:{
                msg:"No se encuentra este email en nuestra base de datos"
            }
        }
      })})
    },

    perfil: function (req, res) {
      console.log("Estas en perfil");
      res.render("perfil", { user: req.session.userLogged });
    },

    registro: (req,res) => {
        res.render ("registro");
    },
    

    guardar: (req,res) => {
      db.user.create({
        nombre: req.body.nombre , 
        apellido: req.body.apellido,
        mail: req.body.correo,
        contraseña: bcryptjs.hashSync (req.body.contrasenia,10),
        categoria_id: parseInt(req.body.perfil),
        imagen: req.file ? req.file.filename : "default-image.jpg",
        edad: parseInt(req.body.edad),

        });
      req.session.userLogged = true

      res.redirect("/users/perfil")
    
    },

    lista: (req,res)=> {
      db.user.findAll()
      .then (function(users){
        res.render("users",{users})
      })
    },

    eliminar: (req, res) =>{
      db.user.destroy({where: {id: req.params.id}})
      .then(res.redirect ("/"))
      .catch(res.status(404))
    },

    editar:(req, res) => {
      let fotoUser= db.user.findByPk(req.params.id)
      let editUser = {
      id: req.params.id,
      nombre: req.body.nombre , 
      apellido: req.body.apellido,
      mail: req.body.correo,
      contraseña: bcryptjs.hashSync (req.body.contrasenia,10),
      categoria_id: parseInt(req.body.perfil),
      imagen: req.file ? req.file.filename : fotoUser.imagen,
      edad: parseInt(req.body.edad),}
      db.user.update(editUser,{where:{id:req.params.id}})
      .then(res.render ("perfil",{user: editUser}))

    },

    modificar: (req, res) => {
      db.user.findByPk(req.params.id)
      .then(user=>res.render("editarUser", {user}))
    },
}


    /* list: (req,res)=> {
      const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      res.render("users",{users})
    }, */

/* store:(req,res) => {
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
 
    }, */

    

    /* destroy :  (req, res) =>{
      let id = req.params.id;

      const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

      let finalusers = users.filter(user => {
        return user.id != id
      })
      
      let usersJSON = JSON.stringify(finalusers, null, " ");
    
      fs.writeFileSync(usersFilePath, usersJSON);

      res.redirect ("/users/users");
    }, */

    /* edit: (req, res) =>{
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    let id = req.params.id; 
    const user = users.find(user => user.id == id)
    
    const editUser = {
      id: parseInt(req.params.id),
      nombre: req.body.nombre , 
      apellido: req.body.apellido,
      correo: req.body.correo,
      contrasenia: bcryptjs.hashSync (req.body.contrasenia,10),
      categoria: req.body.perfil,
      imagen: req.file ? req.file.filename : user.imagen,
      edad: parseInt(req.body.edad),
      
    }
    let indice= users.findIndex(user=>{return user.id==id})
      
      users [indice]= editUser;
      let usersJSON = JSON.stringify(users, null, " ");
      fs.writeFileSync(usersFilePath, usersJSON);

      res.redirect ("/users/perfil");
    }, */

    /* editUser: (req, res) => {
      const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
      const id = req.params.id;
      const user = users.find(user => user.id == id);
      res.render("editarUser", {user})
    }, */
    /* loginProcess: (req,res) => {
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
      
    }, */

module.exports = usersController