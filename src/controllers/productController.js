const path = require ("path");
/* const fs = require ("fs"); */
const db = require ("../database/models")
const {Op} = require ("sequelize");
/* const { stringify } = require("querystring"); */

const productsFilePath = path.join(__dirname,"../data/products.json")

const productController = {
  lista: function(req,res){
    db.product.findAll()
      .then (function(products){
        res.render("catalogo",{products})
      })
  },
  detalle: (req,res) => {
    db.product.findByPk(req.params.id)
      .then((product)=>{res.render("detail",{product})})
  },
  
  crear: (req, res) => {
		res.render("crearProducto")
	},

  guardar: function(req,res){
    
    db.product.create({
      
      nombre: req.body.name , 
      descripcion: req.body.descripcion,
      jerarquia_id: req.body.categoria,
      precio: parseInt(req.body.precio),
      imagen: req.file ? req.file.filename : "default-imagen.jpg",
      color: req.body.color,
    })
    
    .then(res.redirect("/catalogo"))
  },

  modificar: (req, res) => {
    db.product.findByPk(req.params.id)
    .then((product)=>(res.render("editarProducto", {product})))
  },

  editar: (req, res) => {
    let product = db.product.findByPk(req.params.id)
    const editProduct = {
      nombre: req.body.nombre , 
      descripcion: req.body.descripcion,
      jerarquia_id: req.body.categoria,
      precio: parseInt(req.body.precio),
      imagen: req.file ? req.file.filename : product.imagen,
      color: req.body.color,
    }
    db.product.update(editProduct,{where:{id:req.params.id}})
      .then(res.redirect ("/catalogo"));
  },
  
  eliminar: (req, res) => {
    db.product.destroy({where: {id: req.params.id}})
      .then(res.redirect ("/catalogo"))
      .catch(res.status(404))
  },

  listaApi: (req, res) => {
    db.product
      .findAll()
      .then(productos => { 
        let products= []
        for (let i = 0; i < productos.length; i++) {
          const element = {
            id: productos[i].id,
            name: productos[i].nombre,
            descripcion: productos[i].descripcion,
            category: productos[i].jerarquia_id,
            detail: "http://localhost:3000/catalogo/detalleApi/"+productos[i].id,
          }
          products.push(element)
        } 
        return products
      })
      .then((productos)=>{
        return res.status(200).json({
          total: productos.length,
          data:  productos,
          status: 200
        })
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({
          error: 'Error al obtener los usuarios',
          status: 500});
      });
  },

  detalleApi: (req, res) => {
    db.product
      .findByPk(req.params.id)
      .then(producto => {
        if (!producto) {
          return res.status(404).json({ 
            error: 'Producto no encontrado',
            status: 404 });
        }else{
          return res.status(200).json({
          data: producto,
          urlImagen: "http://localhost:3000/images/trek/"+producto.imagen,
          status: 200
        })};
      })
      .catch(error => {
        console.error(error);
        return res.status(500).json({ 
          error: 'Error al obtener el Producto',
          status: 500});
      });
  },

}


  /* detail: (req,res) => { 
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const id = req.params.id
    let product = products.filter (product => {return product.id == id})
    let producto = product[0]
    
    res.render("detail",{product:producto});
    }, */

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
   /*  destroy : (req, res) => {
		let id = req.params.id;

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		let finalProducts = products.filter(product => {
			return product.id != id
		})
		
		let productsJSON = JSON.stringify(finalProducts, null, " ");
	
		fs.writeFileSync(productsFilePath, productsJSON);
	},
   */
  /* change: (req, res) => {
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
  }, */
  /* catalogo: (req,res) => { 
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    
    res.render("catalogo",{products});
    }, */

  /* edit: (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const id = req.params.id;
    const product = products.find(product => product.id == id);
		res.render("editarProducto", {product})
	}, */

module.exports = productController