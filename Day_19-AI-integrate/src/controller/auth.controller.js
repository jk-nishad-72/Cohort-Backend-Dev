

const authsModel = require('../models/auth.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')




async function registerController(req,res) {
     const {username,password}= req.body
     if(!username){
        
        return  res.status(401).json({
            Message:"Invalid Username"
        })
     }

     const userNameExist = await authsModel.findOne({
        username

     })
     if(userNameExist){
        
        return res.status(401).json({
            Message:"UserName already exists  "
        })
     }
  const newUser=  await authsModel.create({
            username,
            password:await bcrypt.hash(password,10)
          })

          const token = jwt.sign({id:newUser._id} , process.env.JWT_SECRET)

          res.cookie('token',token)

       res.status(201).json({
         Message:" register sucessfully",
         User:newUser
       })

    
}
async function loginController(req,res) {

     const {username , password } = req.body

     if(!username){
        return res.status(401).json({
            Message:"Invalid UserName"
        })
     }

     const userExist = await authsModel.findOne({
        username
     })

     if(!userExist){
        return res.status(401).json({
            Message:"Username not found "
        })
     }

     const isMatchPassword = await bcrypt.compare(password,userExist.password)
      
      if(!isMatchPassword){
        return res.status(401).json({
            Mesg:"Incorrect password"
        })
      }
 
       const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET)

       res.cookie('token',token)

       res.status(200).json({
        msg:"login sucessfully"
       })
}




module.exports = {
     registerController,loginController
}