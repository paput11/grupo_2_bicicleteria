/* Paquetes */
const express = require("express");
const app = express ();
const path = require ("path");
const methodOverride = require("method-override");

/* Funcionamiento EJS */
app.set("view engine","ejs")
app.set ("views",path.resolve(__dirname,"views"))

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json()); 
app.use(methodOverride("_method"));

/* Ruteadores */
const mainRouter = require("./routes/mainRoutes")
const productRouter = require("./routes/productsRouter")
app.use("/", mainRouter)
app.use("/catalogo", productRouter)

/* Puerto para funcionamiento local */
const port = process.env.port || 3000;
app.listen(port,()=> (
    console.log("Servidor escuchando en el puerto http://localhost:" + port)
));
