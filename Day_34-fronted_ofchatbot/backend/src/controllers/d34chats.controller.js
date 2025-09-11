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
 
  try {
    // find latest 5 chats for the user
    const Chats = await chatsModel.find({ user: user._id }).sort({ lastActivity: -1 }).limit(5)

    // For each chat, find the last message text (if any)
    const chatsWithLast = await Promise.all(
      Chats.map(async (chat) => {
        const lastMsg = await msgModel.findOne({ chat: chat._id }).sort({ createdAt: -1 })
        return {
          _id: chat._id,
          title: chat.title,
          lastActivity: chat.lastActivity,
          user: chat.user,
          last: lastMsg ? lastMsg.content : ''
        }
      })
    )

    return res.status(200).json({ Message: 'chats retrieve succesfully', chats: chatsWithLast })
  } catch (err) {
    console.error('getChats error:', err)
    return res.status(500).json({ msg: 'internal server error' })
  }
   



  
}


async function getMessages(req,res) {

  try {
    const user = req.user
    const chatId = req.params.id;

    // Verify chat exists and belongs to the user
    const chat = await chatsModel.findById(chatId)
    if (!chat) return res.status(404).json({ msg: 'chat not found' })
    if (String(chat.user) !== String(user._id)) return res.status(403).json({ msg: 'forbidden' })

    const messages = await msgModel.find({ chat: chatId }).sort({ createdAt: 1 })

    // Map to frontend-friendly shape
    const mapped = messages.map(m => ({
      id: m._id,
      role: m.role,
      text: m.content,
      time: m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''
    }))

    return res.status(200).json({ msg: 'messages retrieved successfully', messages: mapped })
  } catch (err) {
    console.error('getMessages error:', err)
    return res.status(500).json({ msg: 'internal server error' })
  }

}

 

module.exports = {
    chatContrlloler,
    getChats,
    getMessages
                                     
}