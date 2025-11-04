
const express = require('express')
const {userController,registerController,loginController,logoutController } = require('../controllers/d20prcauth.controller')



const authRouter = express.Router();


authRouter.get('/user',userController) 
authRouter.get('/logout',logoutController)  
authRouter.post('/register',registerController)
authRouter.post('/login',loginController)





module.exports = authRouter