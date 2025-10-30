
const d17PrcAuthModel = require('../models/d17prcauth.model') 
 const express = require('express')
const authRouter  = express.Router()
const {  registerController,loginController,logoutController, userProfileController}  = require('../controller/d17prcAuth.Controller')


authRouter.post('/register',registerController)
authRouter.post('/login',loginController)
authRouter.get('/user',userProfileController)
authRouter.get('/logout',logoutController)


module.exports = authRouter