const path = require ("path");

const mainController = {
    home: (req,res) => { 
        res.sendFile(path.join(__dirname, "../views/home.html"))
    },
    registro: (req,res) => {
        res.sendFile(path.join(__dirname, "../views/registro.html"));
    },
    contacto: (req,res) => {
        res.sendFile(path.join(__dirname, "../views/contacto.html"));
    },
    catalogo: (req,res) => {
        res.sendFile(path.join(__dirname, "../views/catalogo.html"));
    },
    repuesto: (req,res) => {
        res.sendFile(path.join(__dirname, "../views/repuesto.html"));
    },
    indumentaria: (req,res) => {
        res.sendFile(path.join(__dirname, "../views/indumentaria.html"));
    },
    login: (req,res) => {
        res.sendFile(path.join(__dirname, "../views/login.html"));
    },
    terminos: (req,res) => {
        res.sendFile(path.join(__dirname, "../views/terminos.html"));
    },
    politicas: (req,res) => {
        res.sendFile(path.join(__dirname, "../views/politicas.html"));
    },
    copy: (req,res) => {
        res.sendFile(path.join(__dirname, "../views/copy.html"));
    }   
    
};

module.exports = mainController