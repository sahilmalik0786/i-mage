const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:String,
    username:String,
    password:String,
    history: Array,
})

const userModel = mongoose.model('user' , userSchema)

module.exports = userModel