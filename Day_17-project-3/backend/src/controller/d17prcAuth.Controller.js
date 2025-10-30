const d17PrcAuthModel = require('../models/d17prcauth.model')
const jwt   = require('jsonwebtoken')
const bcrypt = require('bcryptjs')




async function  registerController(req,res) {


     const {username,password} = req.body;

            const IsUserExist  = await d17PrcAuthModel.findOne({username})

            if(IsUserExist){
              res.status(401).json({
                Message:" User already exists "
              })
            }


      const hasPassword = await bcrypt.hash(password,10)

       const newUser =     await d17PrcAuthModel.create({
                username:username,
                password:hasPassword
               })

      const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET) 

      res.cookie('token',token) 

      res.status(201).json({
        Message:" Register Sucessfully 👌🎉 " ,
        User:newUser,
      })


    
}

async function userProfileController(req,res) {

      //  console.log('all cookies ' + req.cookies)

       const token = req.cookies.token;

       if(!token){
         res.status(401).json({
        Message:" Unautherised  ",
        
       })
       }
       const decode = jwt.verify(token,process.env.JWT_SECRET)

       const UserDetail = await d17PrcAuthModel.findById(decode.id)


       res.status(200).json({
        Message:" User Profile ",
        user:UserDetail
       })

  
}

async function  loginController(req,res) {

   const {username,password} = req.body;

    const IsUserExist = await d17PrcAuthModel.findOne({username})

    if(!IsUserExist){
      res.status(401).json({ 
        Message:" User can not Exist ❌ "
      })
       }

      const isMatchPassword = await bcrypt.compare(password,IsUserExist.password) 

      if(!isMatchPassword){

         res.status(401).json({
        Message:" Incorrect Password "
        })
      }

       const token = jwt.sign({id:IsUserExist._id},process.env.JWT_SECRET)

       res.cookie('token',token)

       res.status(200).json({
        Message:" Login Sucessfully 🎉✅ "
       })


   
  
}

async function logoutController(req,res) {
     res.clearCookie('token')
     res.status(200).json({
      Message:' Logout Sucessfully ✅🎉 '
     })
  
}



module.exports = {
    registerController,
    loginController,
    logoutController,
    userProfileController
}