
const express = require('express')

const authRouter = express.Router()
const {getRegisterpage, postRegisterpage ,getLogincontroller,postLogincontroller} = require('../controller/auth.controller')

authRouter.route('/register')
  .get(getRegisterpage) 
  .post(postRegisterpage)


  authRouter.route('/login')
  .get(getLogincontroller)
  .post(postLogincontroller)



module.exports = authRouter