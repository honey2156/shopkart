const Passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./db').User

Passport.serializeUser((user, done) => {
    if (user && user.id) {
        return done(null, user.id)
    }
    done(new Error("user or user id not found"))
})

Passport.deserializeUser((userId, done) => {
    User.findOne({
            where: {
                id: userId
            }
        })
        .then((user) => {
            if (user) {
                done(null, user)
            } else {
                done(new Error("No such user found"))
            }
        })
        .catch((err) => {
            done(err)
        })
})

Passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({
        where: {
            username: username
        }
    }).then((user) => {
        if (!user) {
            return done(null, false, {
                message: 'Username does not exist'
            })
        }
        if (user.password !== password) {
            return done(null, false, {
                message: 'Password is wrong'
            })
        }
        done(null, user)
    }).catch((err) => done(err))
}))

module.exports = Passport