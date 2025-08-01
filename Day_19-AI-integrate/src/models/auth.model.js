const mongoose = require('mongoose')


const authsSchama = new mongoose.Schema({

     username:{
        type:String,
        required:true,
        unique:true,
     },
     password:{
        type:String,
        required:true,
     }
})

const authsModel = new mongoose.model("authentications",authsSchama)


module.exports = authsModel

