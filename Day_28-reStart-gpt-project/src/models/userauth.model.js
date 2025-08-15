

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
            unique:true,
        },
        lastname:{
            type:String,
            required:true,
            unnique:true,
        }
     },
     password:{
        type:String,
        required:true,

     },
     
},{  timestamps:true,
     })

     const authModel = mongoose.model('UserAuth',userAuthSchema);

     module.exports = authModel;
     