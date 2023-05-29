const path = require ("path");
const fs = require ("fs");
const db = require ("../database/models")

const productsFilePath = path.join(__dirname,"../data/products.json")

const productController = {
  lista: function(req,res){
    db.product.findAll()
      .then (function(products){
        res.render("catalogo",{products})
      })
  },
  create: (req, res) => {
		res.render("crearProducto")
	},

  guardar: function(req,res){
    let indice = db.product.Op.max(id)
    .then(    
      db.product.create({
        id: indice ++ ,
        nombre: req.body.name , 
        descripcion: req.body.descripcion,
        jerarquias: req.body.categoria,
        precio: parseInt(req.body.precio),
        imagen: req.file ? req.file.filename : "default-imagen.jpg",
        color: req.body.color,
      })
    ).then(res.redirect("/catalogo"))
    
  },

  detail: (req,res) => { 
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const id = req.params.id
    let product = products.filter (product => {return product.id == id})
    let producto = product[0]
    
    res.render("detail",{product:producto});
    },

  /* store:(req,res) => { 
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    
    const newProduct = {
      id: products[products.length-1].id + 1,
      nombre: req.body.name , 
      descripcion: req.body.descripcion,
      categoria: req.body.categoria,
      precio: parseInt(req.body.precio),
      imagen: req.file ? req.file.filename : "default-imagen.jpg",
      color: req.body.color,
    }
    products.push (newProduct)
    let productJSON= JSON.stringify(products,null," ")
    fs.writeFileSync(productsFilePath, productJSON)

    res.redirect ("/catalogo")
 
  }, */
  destroy : (req, res) => {
		let id = req.params.id;

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let finalProducts = products.filter(product => {
			return product.id != id
		})
		
		let productsJSON = JSON.stringify(finalProducts, null, " ");
	
		fs.writeFileSync(productsFilePath, productsJSON);

		res.redirect ("/catalogo");
	},
  change: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const id = req.params.id;
    const product = products.find(product => product.id == id);
  
    const editProduct = {
      id: parseInt(req.params.id),
      nombre: req.body.nombre , 
      descripcion: req.body.descripcion,
      categoria: req.body.categoria,
      precio: parseInt(req.body.precio),
      imagen: req.file ? req.file.filename : product.imagen,
      color: req.body.color,
    }
    let indice= products.findIndex(product=>{return product.id==id})
    products [indice]= editProduct;
    let productsJSON = JSON.stringify(products, null, " ");
	
		fs.writeFileSync(productsFilePath, productsJSON);

		res.redirect ("/catalogo");
  },
  edit: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const id = req.params.id;
    const product = products.find(product => product.id == id);
		res.render("editarProducto", {product})
	},
  catalogo: (req,res) => { 
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    
    res.render("catalogo",{products});
    },

}

module.exports = productController