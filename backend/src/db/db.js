const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect('mongodb://localhost:27017/captiongenerator')
    .then(()=>{
        console.log('connected to db')
    })
    .catch(console.error)
}

module.exports = {connectToDb}