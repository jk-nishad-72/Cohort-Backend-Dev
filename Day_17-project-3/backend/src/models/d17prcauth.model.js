
const mongoose = require('mongoose')

const d17prcauthSchema = mongoose.Schema({
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

const d17PrcAuthModel = mongoose.model('d17PrcAuthModel',d17prcauthSchema)

module.exports = d17PrcAuthModel