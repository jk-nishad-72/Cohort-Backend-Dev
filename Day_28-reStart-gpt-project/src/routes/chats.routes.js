

const express = require('express');

const chatRouter = express.Router();
const {authMiddlware} = require('../middlewares/auth.middleware')
const {chatController} = require('../controllers/chat.controller');

//* create new chat with title 
chatRouter.post('/',authMiddlware,chatController);


module.exports = chatRouter;

