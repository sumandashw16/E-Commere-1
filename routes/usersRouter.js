const express = require('express')
const router = express.Router()
const userModel = require("../models/user-model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const generateToken = require("../utils/generateToken")

router.get("/", (req,res) => {
    res.send("Yesh Its Working")
})

router.get("/register", (req, res) => {
    res.render("register")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.post("/register", async (req,res) => {
    try {
        let {fullname, email, password} = req.body
        let user = await userModel.findOne({email: email})
        if (user){
            return res.send("User Already Exists, Try Logging in")
        }
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let CreatedUser = await userModel.create({
                    fullname,
                    email,
                    password: hash
                })
                let token = generateToken(CreatedUser)
                res.cookie("token", token, {httpOnly: true})
                res.send("Successfully Created Account")
            })
        })  
    }
    catch (err){
        res.send(err.message)
    }
})

router.post("/login", async (req,res) => {
    try{
        let {email, password} = req.body
        let user = await userModel.findOne({email: email})
        if (user == null) return res.send("No user found")
        bcrypt.compare(password, user.password, (err, result) => {
            if (result){
                let token = generateToken(user)
                res.cookie("token", token, {httpOnly: true})
                return res.send("Login Successfull")
            }
            else{
                res.send("Something Went Wrong")
            }
        })
    } catch (err){
        res.send(err.message)
    }
})


module.exports = router