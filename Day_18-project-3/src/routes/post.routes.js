

const express = require('express')
const postRoutes = express.Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')

const authMiddlware = require("../middlewares/auths.middleware")
const postModel =  require('../models/post.model')
const {createPostController} = require('../controllers/createpost.controller')


const upload = multer({storage:multer.memoryStorage()})

//* protected api 

// /api/post [protected ] {image-file}
postRoutes.post('/', 
    authMiddlware ,
    upload.single("image"),
    createPostController
)

module.exports = postRoutes
