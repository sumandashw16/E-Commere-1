const jwt = require("jsonwebtoken")
const { JWT_KEY } = require("../config/keys")

function generateToken(user){
    jwt.sign(
        {email: user.email, userid: user._id}, 
        JWT_KEY,
    );  
}

module.exports = generateToken