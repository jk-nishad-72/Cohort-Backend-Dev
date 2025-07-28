
//* routes  me api  kon kon se hai  ex
const express = require("express")
// const jwt = require("jsonwebtoken")

const {registerController,logincontroller} = require('../controllers/auth.controller')

const router = express.Router()



router.post('/register',registerController)
router.post('/login',logincontroller)


module.exports = router