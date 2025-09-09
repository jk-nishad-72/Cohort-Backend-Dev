const userAuthModel = require("../models/d34auth.model")
const chatsModel = require('../models/d34chats.model')
const msgModel = require('../models/d34msg.model');


async function chatContrlloler(req,res) {

     const user = req.user

     const {title} = req.body;

      if(!title){
        return res.status(409).json({
            msg:'invalid input'
        })
      }

     const newChat = await chatsModel.create({
          user:user._id,
          title:title,
          
     })

       res.status(201).json({
        msg:" chat created Sucessfuly",
        chat:newChat,
       })  
}



async function getChats(req,res) {

  const user = req.user;
 
   const Chats = await chatsModel.find({user:user._id})

   res.status(200).json({
    Message:"chats retrieve succesfully",
    chats:Chats.map(chat =>({
            _id: chat._id,
            title: chat.title,
            lastActivity: chat.lastActivity,
            user: chat.user
        }))
      })   
   



  
}


async function getMessages(req,res) {

   
  const chatId = req.params.id;

  const messages = await msgModel.find({chat:chatId}).sort({createdAt:1});

  res.status(200).json({
    msg:"messages retrieved successfully",
    messages
  })

   

}
 

module.exports = {
    chatContrlloler,
    getChats,
    getMessages
                                     
}