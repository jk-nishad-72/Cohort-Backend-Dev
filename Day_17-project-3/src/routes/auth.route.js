
//* routes  me api  kon kon se hai  ex
const express = require("express")
// const jwt = require("jsonwebtoken")

const {registerController,loginController ,uProfileController,logoutController} = require('../controllers/auth.controller')

const router = express.Router()


router.get('/user',uProfileController) 
router.post('/register',registerController) 
router.post('/login',loginController) 
router.get('/logout',logoutController) 


module.exports = router