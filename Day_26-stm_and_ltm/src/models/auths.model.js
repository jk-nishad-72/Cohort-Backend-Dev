
const mongoose = require('mongoose')



const authSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        
    }
},{
    timestamps:true 
})

const authModel = mongoose.model('chatAuths',authSchema)


module.exports= authModel