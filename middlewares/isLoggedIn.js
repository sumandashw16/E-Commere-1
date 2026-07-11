const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")

module.exports.isLoggedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        req.flash("error","You need to be loggedIn first ")
        return res.redirect("/users/login")
    }
    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY)
        // console.log(decoded)
        let user = await userModel.findOne({email: decoded.email}).select("-password")
        req.user = user
        next()
    } catch(err) {
        req.flash("error","Something Went Wrong")
        res.redirect("/users/login")
    }
}