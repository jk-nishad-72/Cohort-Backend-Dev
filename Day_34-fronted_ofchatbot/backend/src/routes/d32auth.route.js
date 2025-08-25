
const express = require('express')
 
const { postRegisterController,postLoginController, logoutController, getUserProfileController}  = require('../controllers/d34auth.controller')
const { authMiddleware } = require('../middlewares/d34auth.middleware')

const authRouter = express.Router()

// Raoutes names 
authRouter.post('/register',postRegisterController);
authRouter.post('/login',postLoginController)
authRouter.post('/logout', logoutController)
authRouter.get('/me', authMiddleware, getUserProfileController)

module.exports = authRouter

