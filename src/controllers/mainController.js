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
    accesorios: (req,res) => {
        res.render ("accesorios");
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
    crearProducto: (req,res) => {
        res.render ("crearProducto");
    },    
    editarProducto: (req,res) => {
        res.render ("editarProducto");
    },    
};

module.exports = mainController;