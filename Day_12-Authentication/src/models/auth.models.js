
const mongoose = require('mongoose')


const authSchema = mongoose.Schema({

         username:String,
         password:String,


})

const authModel = mongoose.model('authd12prc',authSchema)

module.exports =  authModel