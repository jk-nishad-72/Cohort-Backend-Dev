
const express = require('express')

const d19postRouter = express.Router()
const { authMiddleware , } = require('../middlewares/d19prcPostauth.middleware')
const { postController,} = require('../controller/d19.post.controller')
const multer = require('multer')
const upload  = multer({storage:multer.memoryStorage()}) 




d19postRouter.post('/',
    authMiddleware,
    upload.single('image'), 
    postController
    ) 

module.exports = d19postRouter