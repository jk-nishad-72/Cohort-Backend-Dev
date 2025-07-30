

const mongoose = require('mongoose')


const authsSchema = new mongoose.Schema({
    
     username:{
            type:String,
            required:true,
            unique:true


     },
     password:{
    type:String,
    required:true,

     }


})

const authsModel = new mongoose.model("authentication",authsSchema)

module.exports = authsModel