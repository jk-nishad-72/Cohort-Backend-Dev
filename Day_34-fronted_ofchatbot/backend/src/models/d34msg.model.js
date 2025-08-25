
const mongoose = require('mongoose')


const msgSchema = new mongoose.Schema({
     
     user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'d34auth'
     },
     chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'d34chats'

     },
     content:{

         type:String,
         required:true,

     },
     role:{
        type:String,
        enum:['user','model','system'],
        default:'user'

     }
     

},{timestamps:true})

const msdModel = mongoose.model('d34msgDB',msgSchema)

module.exports = msdModel