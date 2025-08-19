
const express = require('express');

const userAuthRouter = express.Router();
const { registerController,loginController } = require('../controllers/userAuth.controller');


userAuthRouter.post('/register', registerController)
userAuthRouter.post('/login', loginController)



module.exports = userAuthRouter;