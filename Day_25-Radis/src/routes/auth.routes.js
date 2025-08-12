
const express = require('express')

const authRouter = express.Router()
const {getRegisterpage, postRegisterpage} = require('../controller/auth.controller')

authRouter.route('/register')
  .get(getRegisterpage) 
  .post(postRegisterpage)





module.exports = authRouter