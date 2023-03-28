const path = require ("path");

const fs = require ("fs");

const productsFilePath = path.join(__dirname,"../data/products.json")


const productController = {
  catalogo: (req,res) => { 
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    console.log(products);
    res.render("catalogo",{products});
    },

  };

  module.exports = productController