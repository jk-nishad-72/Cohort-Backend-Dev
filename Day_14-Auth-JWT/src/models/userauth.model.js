

const mongoose = require('mongoose')


const userauthSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,     
    },
    password:{
        type:String,
        required:true,

    }
})

const userauthModel = new mongoose.model("auth",userauthSchema)
module.exports = userauthModel
