const route = require('express').Router()
const Product = require('../../db').Product
const Vendor = require('../../db').Vendor

// get all products
route.get('/', (req, res) => {
    getProducts()
        .then((products) => {
            res.json(products)
        })
})

// get product by id
route.get('/:id', (req, res) => {
    Product.findAll({
            include: [{
                model: Vendor,
                as: 'vendor',
                where: {
                    id: req.params.id
                }
            }]
        })
        .then((product) => {
            if (product) {
                res.json(product)
            } else {
                console.log("no product found")
            }
        })
})

// get products by vendor
route.get('/vendors/:vendorId', (req, res) => {
    Product.findAll({
            where: {
                vendorId: req.params.vendorId
            },
            include: [{
                model: Vendor,
                as: 'vendor'
            }]
        })
        .then((products) => {
            if (products) {
                res.json(products)
            } else {
                console.log("no product found")
            }
        })
})

// add new product
route.post('/', (req, res) => {
    let product = new Product({
        name: req.body.name,
        price: parseFloat(req.body.price),
        vendorId: parseInt(req.body.vendorId)
    })
    product.save()
    res.json({
        success: true,
        product: product
    })
})

// fetches all products
async function getProducts() {
    return Product.findAll({
        include: [{
            model: Vendor,
            as: 'vendor'
        }]
    })
}

module.exports = route