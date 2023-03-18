const express = require("express");
const app = express ();
const path = require ("path");

const mainRouter = require("./routes/mainRoutes")
app.use("/", mainRouter)

app.use(express.static("public"));

const port = process.env.port || 3000;

app.listen(port,()=> (
    console.log("Servidor escuchando en el puerto http://localhost:" + port)
));
