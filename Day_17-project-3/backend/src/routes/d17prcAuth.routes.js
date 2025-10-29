
const d17PrcAuthModel = require('../models/d17prcauth.model') 

 const express = require('express')
    
const authRouter  = express.Router()
const {  registerController,}  = require('../controller/d17prcAuth.Controller')


authRouter.post('/register',registerController)


module.exports = authRouter