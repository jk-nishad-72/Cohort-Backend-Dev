
const mongoose = require('mongoose')

const d20prcPostSchema = mongoose.Schema({
    
    image:String,
    caption:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'d20pracAuthModel'
    }
})

const d20pracPostModel = mongoose.model('d20pracPostModel',d20prcPostSchema)

module.exports = d20pracPostModel