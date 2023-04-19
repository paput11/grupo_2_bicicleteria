const path = require ("path");

const mainController = {
    home: (req,res) => { 
        res.render("home")
    },
    contacto: (req,res) => {
        res.render ("contacto");
    },
    catalogo: (req,res) => {
        res.render ("catalogo");
    },
    accesorios: (req,res) => {
        res.render ("accesorios");
    },
    indumentaria: (req,res) => {
        res.render ("indumentaria");
    },
    terminos: (req,res) => {
        res.render ("terminos");
    },
    //* tours *//
    tours: (req,res) => {
        res.render ("tours");
    },
    //* *//
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