
const e = require('express')
const express = require('express')
const {registerController,loginController} = require('../controllers/d32auth.controller')

const authRouter = express.Router();

authRouter.post('/register',registerController)
authRouter.post('/login',loginController)

module.exports = authRouter