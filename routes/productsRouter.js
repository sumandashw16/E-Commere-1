const express = require('express')
const router = express.Router()
const productModel = require("../models/product-model")
const upload = require("../config/multer-config")
const { create } = require("../controllers/productController")

router.get("/", (req,res) => {
    res.send("Yesh Its Working")
})

router.post("/create", upload.single('image'), create)

module.exports = router