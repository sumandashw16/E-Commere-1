const express = require('express')
const router = express.Router()
const ownersModel = require('../models/owners-model')

if (process.env.NODE_ENV == "development"){
    router.post("/create", async (req,res) => {
        let owners = await ownersModel.find()
        if (owners.length > 0){
            return res
            .status(500)
            .send("You do not have access to create a new owner")
        } 
        let {email, password, fullname} = req.body
        let createdOwner = ownersModel.create({
            email,
            password,
            fullname
        })
        res.status(200).send("Owner Created")
    })
}


router.get("/", (req,res) => {
    res.send("Yesh Its Working")
})


module.exports = router