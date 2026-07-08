const mongoose = require('mongoose')
const config = require('config')
const dbgr = require("debug")("development:mongoose") // This will actiavte or show in the terminal oonly when you set the env variables.


mongoose
.connect(`${config.get("MONGODB_URI")}/SareeStore`) //the config thing can itself see in which env is the current work is going on and brings that conenction
.then(() => {
    dbgr("connected") //to activate this you need to set env variable, in terminal: $env:DEBUG="development:*"
})
.catch((err) => {
    console.log(err)
})

module.exports = mongoose.connection