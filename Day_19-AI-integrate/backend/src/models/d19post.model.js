
const mongoose = require('mongoose')

const d19PrcPostSchema = mongoose.Schema({

     image:String,
     caption:String,
     user:{
       type: mongoose.Schema.Types.ObjectId,
       ref:'d19authPrcModel'
     }
})

const d19PrcPostModel  = mongoose.model('d19PrcPostModel',d19PrcPostSchema);

module.exports = d19PrcPostModel