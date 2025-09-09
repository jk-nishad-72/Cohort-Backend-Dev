
const express = require('express')

const chatRouter = express.Router();
const { chatsMiddleware}  = require('../middlewares/d34auth.middleware')
const {chatContrlloler ,getChats,getMessages}  = require('../controllers/d34chats.controller')


//rotes names 

chatRouter.post('/',chatsMiddleware,chatContrlloler)

// chats 

chatRouter.get('/',chatsMiddleware,getChats)

// get messages of perticular chat

chatRouter.get('/messages/:id',chatsMiddleware,getMessages)


module.exports = chatRouter