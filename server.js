const express = require('express')
const path = require('path')
const User = require('./db').User
const session = require('express-session')
const Passport = require('./passport')
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// passport sessions
app.use(session({
    secret: 'some very very secret thing',
    resave: false,
    saveUninitialized: true
}))

app.use(Passport.initialize())
app.use(Passport.session())

app.use('/', express.static(path.join(__dirname, 'public')))

// middleware for api calls
app.use('/api', require('./routes/api').route)

// middleware for common redirections
app.use('/', require('./common_routes').route)


app.listen(8000, () => {
    console.log('server running at http://localhost:8000/')
})