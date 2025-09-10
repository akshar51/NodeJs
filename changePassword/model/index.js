const { Schema, default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String,
})

const User = mongoose.model('passport-auth',userSchema)

module.exports = User