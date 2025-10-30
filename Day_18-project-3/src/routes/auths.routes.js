

const express = require('express')

const authRoutes = express.Router()

const { registerController,loginController,userController,logoutController} = require('../controllers/auths.controller')


authRoutes.post('/register',registerController)
authRoutes.post('/login',loginController)
authRoutes.get('/user',userController)
authRoutes.get('/logout',logoutController) 







module.exports = authRoutes