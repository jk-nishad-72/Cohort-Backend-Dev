
const express = require('express')

const chatRouter = express.Router();
const { chatsMiddleware}  = require('../middlewares/d34auth.middleware')
const {chatContrlloler ,getChats}  = require('../controllers/d34chats.controller')


//rotes names 

chatRouter.post('/',chatsMiddleware,chatContrlloler)

// chats 

chatRouter.get('/',chatsMiddleware,getChats)


module.exports = chatRouter