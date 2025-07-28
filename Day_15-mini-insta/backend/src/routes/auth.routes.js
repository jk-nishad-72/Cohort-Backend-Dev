

const express = require('express')
const userModel = require('../models/user.model')
const router = express.Router()
var jwt = require('jsonwebtoken');




router.get('/',(req,res)=>{

   res.send("hello ")

})



router.post('/register',async(req,res)=>{

    const {username,password} = req.body

console.log(username,password)

     const existingUser = await userModel.findOne({
        username
     })

     if(!existingUser){
        return res.status(409).json({
            message:"username already exists "
        })
     }

    const user = await userModel.create({

        username,password

         
    })

     const token = jwt.sign({
        id:user_id
     },process.env.JWT_SECRET)


     res.status(201).json({
      message:"register sucessfully",

     })


})

module.exports=router