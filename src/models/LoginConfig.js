//1.Guardar al usuario en DB
//2.Buscar un usuario
//3.buscar usuario por ID
//4.editar la informacion de un usuario
//5.Eliminar usuario x db


const path = require("path");
const fs = require("fs");
const User = {
    fileName:path.join(__dirname, "/../data/users.json"),

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName,"utf-8"));

    },
      generateId:function(){
        let allUsers = this.findAll();
        let lastUsers = allUsers.pop();
        if(lastUsers){
        return lastUsers.id + 1;
    }
    return 1;
      },

    findAll:function(){
        return this.getData();
    },
    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUsers => oneUsers.id === id);
        return userFound;
    },
    findByField: function(field,text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUsers => oneUsers[field] === text);
        return userFound;
    },
    create: function (userData){
        let allUsers = this.findAll();
        let newUsers = {
            id:this.generateId(),
            ...userData
        }
        allUsers.push(newUsers);
        fs.writeFileSync(this.fileName,JSON.stringify(allUsers,null, " "));
        return true;

    },

    delete:function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUsers => oneUsers.id !== id);
        fs.writeFileSync(this.fileName,JSON.stringify(finalUsers,null, " "));
        return true;
    }


}

module.exports = User;