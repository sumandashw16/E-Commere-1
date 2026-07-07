const express = require('express')
const router = express.Router()

router.get("/", (req,res) => {
    res.send("Yesh Its Working")
})

module.exports = router