

const  mongoose = require('mongoose')


const d34chatsSchema = new mongoose.Schema({
    user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'d34auth'
    },
    title:{
        type:String,
        required:true,

    },
    lastActivity:{
        type:Date,
        default:Date.now

    }
},{timestamps:true})

const  chatsModel = mongoose.model('d34chats',d34chatsSchema)


module.exports = chatsModel