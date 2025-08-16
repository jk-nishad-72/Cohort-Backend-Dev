

const mongoose = require('mongoose');   


const chatsSchama = new mongoose.Schema({

      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserAuth',
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
      
     
},{timestamps:true}); 

const chatsModel = mongoose.model('Chats',chatsSchama);
module.exports =  chatsModel;
