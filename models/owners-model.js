const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema.create({
    fullname: String,
    email: String,
    password: String,
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin: String
})

module.exports = mongoose.model("owner", ownerSchema)