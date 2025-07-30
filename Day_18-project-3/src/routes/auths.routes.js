

const express = require('express')

const authRoutes = express.Router()

const { registerController,loginController,userController} = require('../controllers/auths.controller')


authRoutes.post('/register',registerController)
authRoutes.post('/login',loginController)
authRoutes.post('/user',userController)







module.exports = authRoutes