
const mongoose = require('mongoose')


const userAuthSchema = new mongoose.Schema({
    email:{
          type:String,
          required:true,
          unique:true,
    },
    fullname:{
        firstname:{
  type:String,
  required:true,
 

        },
        lastname:{
  type:String,
  required:true,


        }
    },
    password:{
  type:String,
  required:true,
  unique:true,

    }
},{timestamps:true})


const userAuthModel = mongoose.model('d34auth',userAuthSchema)


module.exports= userAuthModel