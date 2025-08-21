
const mongoose = require('mongoose')


const UserAuthSchema =  new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true

    },
    fullname:{
        firstname:{
             type:String,
             required:true,
             unique:true

        },
        lastname:{
            type:String,
            required:true,
         
        }
    },
    password:{

         type:String,
         required:true,
         unique:true
    }
},{timestamps:true})


const userAuthModel  = mongoose.model('d32auth',UserAuthSchema);

module.exports = userAuthModel;