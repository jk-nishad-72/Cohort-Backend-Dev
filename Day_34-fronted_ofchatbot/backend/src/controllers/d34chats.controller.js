const userAuthModel = require("../models/d34auth.model")
const chatsModel = require('../models/d34chats.model')

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

module.exports = {
    chatContrlloler
}