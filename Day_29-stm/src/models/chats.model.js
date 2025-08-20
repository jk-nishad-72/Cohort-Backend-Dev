
const mongoose = require('mongoose')



const ChatsSchema = new mongoose.Schema({


     
    user:{

         type:mongoose.Schema.Types.ObjectId,
         ref:"chat-bot-auth",
         required:true,

    },
    title:{
        type:String,
        required:true,


    },
    lastActivity:{
        type:Date,
        default:Date.now,

    }

},{timestamps:true})

const chatsModel = new mongoose.model("Chats",ChatsSchema)

module.exports = chatsModel