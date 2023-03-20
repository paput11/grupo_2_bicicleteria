const path = require ("path");

const mainController = {
    home: (req,res) => { 
        res.render("home")
    },
    registro: (req,res) => {
        res.render ("registro");
    },
    contacto: (req,res) => {
        res.render ("contacto");
    },
    catalogo: (req,res) => {
        res.render ("catalogo");
    },
    repuesto: (req,res) => {
        res.render ("repuesto");
    },
    indumentaria: (req,res) => {
        res.render ("indumentaria");
    },
    login: (req,res) => {
        res.render ("login");
    },
    terminos: (req,res) => {
        res.render ("terminos");
    },
    politicas: (req,res) => {
        res.render ("politicas");
    },
    copy: (req,res) => {
        res.render ("copy");
    },   
    rental: (req,res) => {
        res.render ("rental");
    },
    carro: (req,res) => {
        res.render ("carro");
    },    
 };

module.exports = mainController;