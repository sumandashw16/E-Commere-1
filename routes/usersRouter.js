const express = require('express')
const router = express.Router()
const userModel = require("../models/user-model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const generateToken = require("../utils/generateToken")
const { registerUser, loginUser } = require("../controllers/authController")


router.get("/", (req,res) => {
    res.send("Yesh Its Working")
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/register", registerUser)

router.post("/login", loginUser)


module.exports = router