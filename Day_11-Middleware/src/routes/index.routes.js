
const express = require('express')

const router = express.Router()



router.use((req,res,next)=>{
    console.log("router and api ke bich ka middlware ")
    next();
})


router.get('/',(req,res)=>{

    res.json({
        Message:"welcome to Server Home  "
    })
})


module.exports =router