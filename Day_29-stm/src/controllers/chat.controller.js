
const chatsModel = require('../models/chats.model')



async function  chatController(req,res){

     const user = req.user

    //  if(!user){
    //     return res.status(409).json({
    //         Message:" Invalid User"
    //     })
    //  }

    const {title}  = req.body

    const newChat = await chatsModel.create({
        user:user._id,
        title:title
    })

    res.status(201).json({
        Message:'chat created succesfully ',
        _id:newChat._id,
        title:title,
        user:newChat.user,
        lastActivity:newChat.lastActivity,
    })

    
}

module.exports = {chatController}