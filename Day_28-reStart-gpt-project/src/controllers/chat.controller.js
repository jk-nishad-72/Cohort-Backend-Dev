
const chatModel = require('../models/chats.model');


async function chatController(req,res){

     const user = req.user;
     const { title} = req.body;

     const newChat = await chatModel.create({
        user:user._id,
        title:title,
     })

     res.status(201).json({
        Message:"chat created sucessfully ",
        chat:{
            _id:newChat._id,
            title:newChat.title,
            user:newChat.user,
            lastActivity:newChat.lastActivity,
        }
     })
      

}

module.exports ={ chatController}