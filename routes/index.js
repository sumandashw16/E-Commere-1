const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("../middlewares/isLoggedIn")
const productModel = require("../models/product-model")

router.get("/", isLoggedIn, (req, res) => {
    res.redirect("/users/login")
})

router.get("/shop", isLoggedIn, async (req,res) => {
    let products = await productModel.find()
    products = products.map(p => {
        p.image = p.image.toString("base64")
        return p
    })
    res.render("shop", { products })
})

module.exports = router