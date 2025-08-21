
const mongoose = require('mongoose')


const d32chatsSchema = new  mongoose.Schema({

       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"d32auth"
       },
       title:{
        type:String,
        required:true,
       },
       lastActivity:{
        type:Date,
        default:Date.now
       }
     
},{timestamps:true});

const chatsModel = mongoose.model('d32chats',d32chatsSchema);

module.exports = chatsModel;