


const express = require('express')
const chatsRouter = express.Router();
const {authMiddleware} = require('../middlewares/d32auth.middleware');
const {chatsController} = require('../controllers/d32chats.controller')


//* new chats 
chatsRouter.post('/',authMiddleware,chatsController)


module.exports = chatsRouter