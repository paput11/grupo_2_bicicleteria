const express = require("express");

const path = require ("path");


const app = express ();


const port = process.env.port || 3000;

app.listen(port,()=> (
    console.log("Servidor escuchando en el puerto http://localhost:" + port)
));
app.use(express.static("public"));
    
app.get ("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get ("/registro", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/registro.html"));
});

app.get ("/contacto", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/contacto.html"));
});

app.get ("/catalogo", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/catalogo.html"));
});
app.get ("/repuesto", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/repuesto.html"));
});

app.get ("/indumentaria", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/indu.html"));
});


    app.get ("/login", (req,res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"));
});