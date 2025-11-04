
const d20pracAuthModel = require('../models/d20prcauth.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



async function userController (req,res) {

    const token = req.cookies.token

    if(!token){
        res.status(401).json({
            Msg:"Unautherisec ❌ ", 
            
        })
    }

   try{
      const decode = jwt.verify(token,process.env.JWT_SECRET)

      const user = await d20pracAuthModel.findById(decode.id)

       res.status(200).json({
            Msg:" User Profile ",
            User : user
        })
   }
   catch(error){
     res.status(400).json({
            Msg:" Unautherised ❌  " +error,
        })
   }
    
}
async function registerController(req,res){

        const {username,email,password}  = req.body;

           const isUserExist = await d20pracAuthModel.findOne({username})

           if(isUserExist){
            res.status(401).json({
            Msg:" User already exists ",
            
        })   }






        const NewUser = await d20pracAuthModel.create({
              username:username,
              email:email,
              password:await bcrypt.hash(password,10)
        })

         const token = jwt.sign({id:NewUser._id},process.env.JWT_SECRET) 

         res.cookie('token',token) 
         
        res.status(201).json({
            Msg:" Register Sucessfully 🎉 ",
            user:NewUser
        })
}
async function loginController(req,res) {


      const { email , password }  = req.body;

     const finduser = await d20pracAuthModel.findOne({email})  


      if(!finduser){
         res.status(401).json({
            Msg:" User can't be find ",
        })
      }

      const isMatchPassword = await bcrypt.hash(password,finduser.password)

      if(!isMatchPassword){
         res.status(401).json({
            Msg:"Incorrect Password  ",
        })
      }

       
const token = jwt.sign({id:finduser._id},process.env.JWT_SECRET) 

         res.cookie('token',token) 
         
        res.status(200).json({
            Msg:" Login Sucessfully 🎉 ",
            user:finduser
        })




}

async function logoutController(req,res) {

    res.clearCookie('token')

    res.status(200).json({
            Msg:" Logout SucessFully 🎉  ",
        }) 


}

module.exports = {
     userController,registerController,loginController,logoutController
}