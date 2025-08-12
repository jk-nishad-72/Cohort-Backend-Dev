
const express = require('express')

const authRouter = express.Router()



authRouter.get('/register',(req,res)=>{

    res.render('register')
})

authRouter.post('/rgister',(req,res)=>{})



module.exports = authRouter