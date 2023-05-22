const db = require("../database/models");
const user = require("../models/LoginConfig");
const productosBicicletas = require("../models/ProductosSequilize");
const Op = db.Sequelize.Op;
const moviesController = {
'list': (req, res) => {
   
    db.productosBicicletas.findAll()
    .then(productosBicicletas => {
        res.render(/*"Archivo ejs de prodcuto */"", {productosBicicletas})
    })
    .catch(error => {
        res.send(error)
    })
},
'detail': (req, res) => {
    // Do the magic
    db.productosBicicletas.findByPk(req.params.id)
    .then(productosBicicletas => {
        res.render(/*archivo ejs */"", {productosBicicletas})
    })
    .catch(error => {
        res.send(error)
    })
},
'new': (req, res) => {
    // Do the magic
    db.productosBicicletas.findAll(
        {
            order: [["release_date", "DESC"]],
            limit: 5
        }
    )
    .then(productosBicicletas => {
        res.render(/*archivo ejs */"", {productosBicicletas})
    })
    .catch(error => {
        res.send(error)
    })
},
'recomended': (req, res) => {
    // Do the magic
    db.productosBicicletas.findAll(
        {
            where: {
                rating: {[Op.gte] : 8}
            },
            order: [["rating", "DESC"]],
            limit: 5
        }
    )
    .then(productosBicicletas=> {
        res.render(/*archivo ejs */"", {productosBicicletas})
    })
    .catch(error => {
        res.send(error)
    })
},
create: function (req, res) {
    res.render(/*archivo ejs */)
},
processCreate: function (req, res) {
    db.productosBicicletas.create({
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length
    })
    .then(productosBicicletas => {
        res.redirect(/* Redirige */
        )
    })
    .catch(error => {
        res.send(error)
    })

},
edit: function (req, res) {
    db.productosBicicletas.findByPk(req.params.id)
    .then(productosBicicletas => {
        res.render(/*archivo ejs */"", {productosBicicletas: productosBicicletas})
    })
    .catch(error => {
        res.send(error)
    })
},
processEdit: function (req, res) {
    db.productosBicicletas.update({
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length
    },
    {
        where: {id: req.params.id}
    }
    )
    .then(productosBicicletas => {
        res.redirect(/* REDIRIGE */)
    })
    .catch(error => {
        res.send(error)
    })

},
delete: function (req, res) {
    db.productosBicicletas.findByPk(req.params.id)
    .then(productosBicicletas => {
        res.render(/*archivo ejs */"", {productosBicicletas:productosBicicletas})
    })
    .catch(error => {
        res.send(error)
    })
},
processDelete: function (req, res) {
    db.productosBicicletas.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(productosBicicletas => {
        res.redirect(/*archivo ejs */)
    })
    .catch(error => {
        res.send(error)
    })
},
}
