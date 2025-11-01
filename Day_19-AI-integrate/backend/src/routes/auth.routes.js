const express = require('express')
const authRouter = express.Router();
const { registerController,loginController,userController,logoutController}  = require('../controller/auth.controller')




authRouter.post('/register',registerController)
authRouter.post('/login',loginController)
authRouter.get('/user',userController)
authRouter.get('/logout',logoutController)


module.exports = authRouter




