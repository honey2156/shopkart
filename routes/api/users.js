const route = require('express').Router()
const User = require('../../db').User

// get all users
route.get('/', (req, res) => {
    User.findAll()
        .then((users) => {
            res.json(users)
        })
})

route.post('/', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    user.save()
    res.json(user)
})

module.exports = route