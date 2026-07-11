const productModel = require("../models/product-model")

module.exports.create = async (req, res) => {
    try{
        if (!req.file) return res.status(400).send("Image Is Required")
        let {name, price, discount, bgcolor, panelcolor, textcolor} = req.body
        let image = req.file.buffer
        let product = await productModel.create({
            image,
            name, 
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        })
        req.flash("success", "Product Created Successfully")
        res.redirect("/owners/product")
    }catch (err){
        res.status(500).send(err.message)
    }
}