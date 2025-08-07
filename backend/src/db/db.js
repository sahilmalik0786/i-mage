const mongoose = require('mongoose')
// process.env.MONGODB_URI
function connectToDb(){
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('connected to db')
    })
    .catch(console.error)
}

module.exports = {connectToDb}