
const mongoose = require('mongoose')


const d19authpracSchema  = mongoose.Schema({

     username:{
        type:String,
        required:true,
        unique:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true,
        unique:true
     },
})

const d19authPrcModel = mongoose.model('d19authPrcModel' , d19authpracSchema)

module.exports = d19authPrcModel