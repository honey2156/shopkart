const route = require('express').Router()
const path = require('path')
const User = require('./db').User
const Passport = require('./passport')

route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'))
})

route.get('/products/addproduct', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/addproduct.html'))
})

route.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/cart.html'))
})

// Authentication
route.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/login.html'))
})

route.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/signup.html'))
})

route.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }).then((user) => {
        if (user) {
            res.redirect('/login')
        }
    }).catch((err) => res.send("ERROR CREATING USER" + err))
})

route.get('/checkLogin', (req, res) => {
    if (req.user) {
        User.find({
                where: {
                    id: req.user.id
                }
            })
            .then((user) => {
                res.send(user)
            })
    }
})

route.post('/login', Passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}))

route.get('/logout', (req, res) => {

    req.logout();
    req.session.destroy(function (err) {
        res.redirect('/');
    })
})

module.exports = {
    route
}