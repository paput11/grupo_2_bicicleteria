let db = require ("../");


let bicicletasController = {
    crear:function(req,res){
        db.product.findAll()
//   .then(function(product)){
            return res.render("testeo",{product:product})
 //       }
    }
}







module.exports = controllerBicicletas;