
const chatsModel = require('../models/d32chats.model')


async function chatsController(req,res) {

    const user = req.user
    const { title} = req.body;  
        const newChat = await chatsModel.create({
            user:user._id,
            title:title,
        })
    res.status(201).json({
       Message:"chat created",
       chat:newChat
    })
}

module.exports = {
    chatsController
}