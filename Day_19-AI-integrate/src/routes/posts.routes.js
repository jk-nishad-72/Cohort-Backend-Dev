

const express = require('express')
const {postscontroller}  = require('../controller/posts.controller')
const postsMiddleware  = require('../middlewares/posts.middleware')

const postsRouter = express.Router()
const multer = require('multer')


  const upload = multer({storage:multer.memoryStorage()})
postsRouter.post('/',
    postsMiddleware,
   upload.single('image'),
    postscontroller)



module.exports = postsRouter



