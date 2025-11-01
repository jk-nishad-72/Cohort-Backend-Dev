
const d19authPrcModel  = require('../models/auth.models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



async function registerController(req,res){ 

     const {username,email,password} = req.body;


     const IsUsernameExist = await d19authPrcModel.findOne({username})
      
       if(IsUsernameExist){
            res.status(401).json({
        Msg:"User Name alreaddy Exists  ",
        
       })

          }


           
         

         const newUser = await d19authPrcModel.create({
            username:username,
            email:email,
            password:await bcrypt.hash(password,10) 
         })


       const token = jwt.sign({id:newUser._id} , process.env.JWT_SECRET)

       res.cookie('token',token) 


       res.status(201).json({
        Msg:" Register succesFully 🎉 ",
        user:newUser
       })


        

     
}

async function  loginController(req,res) {
    
}
async function  userController(req,res) {
    
}
async function  logoutController(req,res) {
    
}

module.exports = {
    registerController,
    loginController,
    userController,
    logoutController
}