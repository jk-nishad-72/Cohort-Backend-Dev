
const express = require('express')

const authRouter = express.Router()



authRouter.get('/user',(req,res)=>{

    res.json({
        message:" New User Welcome "
    })
})





module.exports = authRouter