/* Paquetes */
const express = require("express");
const app = express ();
const path = require ("path");

/* Ruteadores */
const mainRouter = require("./routes/mainRoutes")
app.use("/", mainRouter)

/* Funcionamiento EJS */
app.set("view engine","ejs")
app.set ("views",path.resolve(__dirname,"views"))

app.use(express.static("public"));

/* Puerto para funcionamiento local */
const port = process.env.port || 3000;
app.listen(port,()=> (
    console.log("Servidor escuchando en el puerto http://localhost:" + port)
));
