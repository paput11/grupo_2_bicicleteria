const path = require ("path");

const fs = require ("fs");

const productsFilePath = path.join(__dirname,"../data/products.json")


const productController = {
  catalogo: (req,res) => { 
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    
    res.render("catalogo",{products});
    },

  detail: (req,res) => { 
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const id = req.params.id
    let product = products.filter (product => {return product.id == id})

    console.log(product)
    res.render("detail",{product});
    },
  };

  module.exports = productController