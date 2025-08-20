
const express = require('express')
const chatRouter = express.Router()
const {chatMiddlewate}   = require('../middlewares/chat.middleware')
const { chatController} = require('../controllers/chat.controller')

 chatRouter.post('/', chatMiddlewate ,chatController)


module.exports= chatRouter