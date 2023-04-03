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
  edit: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const id = req.params.id;
    const product = products.find((product) => product.id == id);
  
    if (!product) {
      return res.status(404).send('Product not found');
    }
  
    res.render('editarProducto', { product });
  },
  
  module.exports = productController