
const mongoose = require('mongoose')


const d14pracauthSchema = new mongoose.Schema({

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
            
        }
})

const d14pracauthModel = new mongoose.model('d14pracauthModel',d14pracauthSchema)

module.exports = d14pracauthModel