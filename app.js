require("dotenv").config()
const express = require('express')
const app = express()
const cookieParser = require("cookie-parser")
const path = require('path')
const expressSession = require("express-session")
const flash = require("connect-flash")
const db = require('./config/mongoose-connection')
const usersRouter = require('./routes/usersRouter')
const ownersRouter = require('./routes/ownersRouter')
const productsRouter = require('./routes/productsRouter')
const indexRouter = require('./routes/index')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser()) 
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}))

app.use(flash())
// Router Mounting
app.use("/", indexRouter)
app.use("/owners", ownersRouter)
app.use("/products", productsRouter)
app.use("/users", usersRouter)

console.log(process.env.NODE_ENV) // to set this write command: $env:NODE_ENV="development"

app.listen(3000, () => {
    console.log("server running on localhost: 3000")
})







