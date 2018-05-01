const route = require('express').Router()
const Product = require('../../db').Product
const Vendor = require('../../db').Vendor
const User = require('../../db').User
const Cart = require('../../db').Cart

// get all carts
route.get('/', (req, res) => {
    Cart.findAll({
            where: {
                userId: req.user.id
            },
            include: [{
                model: Product,
                as: 'product'
            }]
        })
        .then((carts) => {
            if (carts) {
                res.json(carts)
            } else {
                console.log('no products found in cart')
            }
        })
})

// add product to the cart
route.post('/:productId', (req, res) => {
    if (req.user && req.user.id) {
        Cart.find({
                where: {
                    productId: parseInt(req.params.productId),
                    userId: req.user.id
                }
            })
            .then((cartProduct) => {
                if (cartProduct) {
                    cartProduct.quantity++;
                    cartProduct.save()
                } else {
                    cartProduct = new Cart({
                        productId: parseInt(req.params.productId),
                        quantity: 1,
                        userId: req.user.id
                    })
                    cartProduct.save()
                }

                res.json({
                    success: true,
                    cart: cartProduct
                })
            })
    } else {
        console.log("You are not Logged in")
    }
})

// increments the quantity of product in cart
route.post('/add/:productId', (req, res) => {
    Cart.find({
            where: {
                productId: parseInt(req.params.productId),
                userId: req.user.id
            }
        })
        .then((cartProduct) => {
            cartProduct.quantity++;
            cartProduct.save()
            res.json({
                success: true,
                cart: cartProduct
            })
        })
})

// decrements the quantity of product in cart and deletes cart product if quantity becomes 0
route.post('/remove/:productId', (req, res) => {
    Cart.find({
            where: {
                productId: parseInt(req.params.productId),
                userId: req.user.id
            }
        })
        .then((cartProduct) => {
            if (cartProduct.quantity == 1) {
                Cart.destroy({
                    where: {
                        id: parseInt(cartProduct.id)
                    }
                })
            } else {
                cartProduct.quantity--
                    cartProduct.save()
            }

            res.json(cartProduct)
        })
})

// route.use((req, res) => {
//     if (!req.user) {
//         res.send("you are not logged in")
//     }
//     Cart.findAll({
//             where: {
//                 userId: parseInt(req.user.id)
//             },

//             include: [{
//                 model: Product,
//                 as: 'product'
//             }]
//         })
//         .then((cart) => {
//             res.json(cart)
//         })
// })

module.exports = route