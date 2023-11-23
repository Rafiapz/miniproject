require('dotenv').config()
const express = require('express')
const handlebars = require('express-handlebars')
const sessions = require('express-session')
const path = require('path')
const userRoute = require('./routs/user')
const adminRoute = require('./routs/adminRoute')
const port = process.env.PORT||8000
const app = express()

const min = 1000 * 60 * 60
app.use(sessions({
    secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD',
    saveUninitialized: false,
    cookie: {
        maxAge: min
    },
    resave: false
}))


app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-cache')
    next()
})

app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars.engine({
    layoutsDir: __dirname + '/views/layout',
    defaultLayout: 'index',
    extname: 'handlebars'
}))



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());



app.use('/', userRoute)
app.use('/', adminRoute)

app.listen(port, () => console.log(`Server is running on the port ${port}`))

