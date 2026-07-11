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

router.post("/shop/add-to-cart/:id", isLoggedIn, async (req,res) => {
    try{
        let product_id = req.params.id
        if (!req.user.cart.includes(product_id) || product_id === undefined){
            req.user.cart.push(product_id)
            await req.user.save()
        }
        res.redirect("/shop")
    }catch(err){
        console.log(err.message)
    }
})

module.exports = router