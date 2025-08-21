
const mongoose = require('mongoose')


const messageSchema = new mongoose.Schema({

       user:{
         type:mongoose.Schema.Types.ObjectId,
         ref:" d32auth"
       },
       chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"d32chats",


       },
       content:{
        type:String,
        required:true,
        

       },
     role:{
     type:String,
     enum:['user','model','system'],
     default:"user"
        
         
       }

     
},{timestamps:true})

const messageModel = mongoose.model('d32message',messageSchema)


module.exports = messageModel