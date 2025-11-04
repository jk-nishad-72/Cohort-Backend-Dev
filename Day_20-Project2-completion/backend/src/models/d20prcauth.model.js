
const mongoose = require('mongoose')


const d20prcauthSchema = mongoose.Schema({
     
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

const d20pracAuthModel =  mongoose.model('d20pracAuthModel' ,d20prcauthSchema)

module.exports = d20pracAuthModel