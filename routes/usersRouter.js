const express = require('express')
const router = express.Router()
const userModel = require("../models/user-model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const generateToken = require("../utils/generateToken")
const { registerUser, loginUser } = require("../controllers/authController")
const { isLoggedIn } = require("../middlewares/isLoggedIn")


router.get("/", (req,res) => {
    res.send("Yesh Its Working")
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.get("/login", (req, res) => {
    // req.flash("error", "message")
    res.render("login", {messages: req.flash("error")})
})

router.get("/cart", isLoggedIn, async (req,res) =>{
    try{
        let user = await req.user.populate("cart")
        let cart = user.cart.map(product => {
            product.image = product.image.toString("base64")
            return product
        })
        res.render("cart", {cart: cart})
    }catch (err){
        console.log(err.message)
        res.redirect("/shop")
    }
})

router.post("/cart/remove/:product_id", isLoggedIn, async(req, res) => {
    try{
        let product_id = req.params.product_id
        let index = req.user.cart.findIndex(id => id.toString() === product_id)
        if (index !== -1){
            req.user.cart.splice(index, 1)
            await req.user.save()
            res.redirect("/users/cart")
        }else{
            console.log("Product Is not In The DB")
            res.redirect("/users/cart")
        }
    }catch(err){
        console.log(err.message)
    }
})

router.get("/logout", (req,res) => {
    res.cookie("token", "")
    res.redirect("/users/login")
})

router.post("/register", registerUser)

router.post("/login", loginUser)


module.exports = router